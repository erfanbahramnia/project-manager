const { body } = require("express-validator");
const path = require("path");

class UserValidator {
    imageValidation() {
        return [
            body("image").custom((image, {req}) => {
                // check if user have been upload a image
                if (Object.keys(req?.file).length == 0) throw {status: 400,  message: "please upload a image"};
                // check image format
                const imageFormat = path.extname(req?.file?.filename);
                const types = [".png", ".jpg", ".jpeg", ".gif", ".webq"];
                if (!types.includes(imageFormat)) throw {status: 400, message: "please upload a valid format image"}
                // check image size
                const imageSize = req?.file?.size;
                const maxSize = 2*1024*1024;
                if(imageSize > maxSize) throw {status: 400, message: "size of image should be less than 2MB"};
                // validate successfully
                return true;
            })
        ];
    };
};

module.exports = {
    UserValidator: new UserValidator()
};