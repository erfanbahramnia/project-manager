const { body, param } = require("express-validator");
const { ProjectModel } = require("../../model/project.model.js");
const path = require("path");

class ProjectValidator {
    create() {
        return [
            body("title").notEmpty().withMessage("Title should not be empty"),
            body("text").isLength({min: 20}).withMessage("text should be more than 20 character")
        ];
    };

    imageUpdateValidator() {
        return [
            body("image").custom((image, {req}) => {
                // check if user have been upload a image
                if (Object.keys(req?.files).length == 0) throw {status: 400,  message: "please upload a image"};
                // check image format
                const imageFormat = path.extname(req?.files?.image.name);
                const types = [".png", ".jpg", ".jpeg", ".gif", ".webq"];
                if (!types.includes(imageFormat)) throw {status: 400, message: "please upload a valid format image"}
                // check image size
                const imageSize = req?.files?.image.size;
                const maxSize = 2*1024*1024;
                if(imageSize > maxSize) throw {status: 400, message: "size of image should be less than 2MB"};
                // validate successfully
                return true;
            }),
            param("projectId").isMongoId().withMessage({status: 400, message: "please enter a valid id"}).custom(async(value, {req}) => {
                const owner = req.user._id;
                const project = await ProjectModel.findOne({_id: value, owner});
                if(!project) throw {status: 400, message: "there is no such this project"}
            }),
        ];
    };

    // mongoDbObjectIdValidation() {
    //     return [
    //     ];
    // };
};

module.exports = {
    ProjectValidator: new ProjectValidator()
};