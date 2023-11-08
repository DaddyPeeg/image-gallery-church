const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { getImagePaths, transferFiles } = require("./imagecontrol");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const { parsed: config } = dotenv.config();

const getDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return [month, day, year];
};

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/Images");
  },
  filename: function (req, file, cb) {
    date = getDate();
    const [month, day, year] = date;
    cb(null, `${month}-${day}-${year}_${file.originalname}`);
  },
});

const upload = multer({ storage: fileStorage });

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUDNAME,
  api_key: config.CLOUDINARY_APIKEY,
  api_secret: config.CLOUDINARY_APISECRET,
  secure: true,
});

const BASE_URL = `https://api.cloudinary.com/v1_1/${config.CLOUDINARY_CLOUDNAME}/resources/image/?max_results=500&prefix=imagegallery&type=upload`;

const auth = {
  username: config.CLOUDINARY_APIKEY,
  password: config.CLOUDINARY_APISECRET,
};

app.post("/upload", upload.array("photos"), async (req, res) => {
  try {
    const files = req.files;
    const images = await getImagePaths();
    const logFiles = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "imagegallery",
      });
      logFiles.push(result);
    }
    console.log("Uploading Complete");
    const tFiles = await transferFiles();
    if (tFiles) {
      res.status(201).json({ message: `${files.length} Files Uploaded` });
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

app.get("/photos", async (req, res) => {
  try {
    const response = await axios.get(BASE_URL, { auth });
    console.log("Query Success");
    return res.send(response.data);
  } catch (e) {
    console.log(e.response);
  }
});

app.delete("/photos/delete/:id", async (req, res) => {
  try {
    if (req.params.id) {
      s = await cloudinary.uploader.destroy(`imagegallery/${req.params.id}`, {
        invalidate: true,
      });
    }
    if (s.result === "not found") {
      console.log("File Not Found");
      res.status(404).json({
        deleted: s.result,
        success: false,
        message: "Product not Found",
        statusCode: 404,
      });
    } else {
      console.log("Deletion Complete");
      res.status(201).json({
        deleted: req.params.id,
        success: true,
        message: "Product Deleted",
        statusCode: 201,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
});

app.delete("/photos/delete", async (req, res) => {
  try {
    if (req.body.resources) {
      const data = req.body.resources;
      const toBeDeleted = [];
      data.map((image) => {
        toBeDeleted.push(image.public_id);
      });
      const deletedItems = await cloudinary.api.delete_resources(toBeDeleted, {
        invalidate: true,
      });
      console.log(deletedItems.deleted);
      console.log("Deletion Complete");
      res.status(201).send(deletedItems);
    }
  } catch (e) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
