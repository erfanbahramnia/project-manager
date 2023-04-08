const multer = require("multer");
const path = require("path");
const { createPathDirectory } = require("./functions.js");

const storage = multer.diskStorage({
    // define where image gonno store
    destination: (req, file, cb) => {
        dirPath = createPathDirectory();
        cb(null, dirPath);
    }, 
    // define the name of the image
    filename: (req, file, cb) => {
        const type = path.extname(file?.originalname || "");
        cb(null, Date.now() + type);
    }
});
const upload_multer = multer({storage});

module.exports = {
    upload_multer
};
