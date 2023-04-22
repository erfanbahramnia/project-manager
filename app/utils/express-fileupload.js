const path = require("path");
const { createPathDirectory } = require("./functions");

const uploadFile = async (req, res, next) => {
    try {
        // validate that user does not send anything
        if (Object.keys(req.files).length === 0) throw {status: 400, message: "please upload a image"};
        // save the data of image 
        let image = req.files.image;
        // get image format
        const imageFormat = path.extname(req?.files?.image.name);
        if(![".png", ".jpg", ".jpeg", ".gif", ".webq"].includes(imageFormat)) throw {status: 400, message: "please enter a valid image format"}
        // create path for save the image in it
        let uploadPath = path.join(createPathDirectory(), (Date.now() + imageFormat));
        // save path of saved image so update in db
        req.body.image = uploadPath.substring(7);
        // save image in especific path
        image.mv(uploadPath, (err) => {
            // handle error
            if (err) throw {status: 500, message: "update image failed!"};
            // uploaded successfully
            return true;
        });
        // next middleware
        next();
    } catch (error) {
        // handle error
        next(error);
    };
};

module.exports = {
    uploadFile
};