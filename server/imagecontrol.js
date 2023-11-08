const fs = require("fs").promises;
const path = require("path");

const directoryPath = "public/assets/Images";
const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

const getImagePaths = async () => {
  const imagePaths = [];

  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      const extension = path.extname(file);
      if (allowedExtensions.includes(extension)) {
        const imagePath = `./${directoryPath}/${file}`;
        imagePaths.push(imagePath);
      }
    }
  } catch (err) {
    console.error(err);
  }

  return imagePaths;
};

const sourceDirectoryPath = "public/assets/Images";
const destinationDirectoryPath = "public/assets/Uploaded";

const transferFiles = async () => {
  try {
    const files = await fs.readdir(sourceDirectoryPath);

    const imagePaths = files.filter((file) =>
      allowedExtensions.includes(path.extname(file))
    );

    for (const imagePath of imagePaths) {
      const sourcePath = path.join(sourceDirectoryPath, imagePath);
      const destinationPath = path.join(destinationDirectoryPath, imagePath);
      await fs.rename(sourcePath, destinationPath);
    }
    console.log("Finished Bulk Transfer");
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { getImagePaths, transferFiles };
