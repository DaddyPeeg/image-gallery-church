const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { json } = require("body-parser");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(cors());
app.use(json());

const { parsed: config } = dotenv.config();

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

// cloudinary.api.resources(
//   { type: "upload", prefix: "imagegallery", max_results: 500 },
//   function (error, result) {
//     console.log(result, error);
//   }
// );

app.get("/photos", async (req, res) => {
  try {
    const response = await axios.get(BASE_URL, { auth });
    return res.send(response.data);
  } catch (e) {
    console.log(e.response);
  }
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
