const { body } = require("express-validator");

class ProjectValidator {
    create() {
        return [
            body("title").notEmpty().withMessage("Title should not be empty"),
            body("text").isLength({min: 20}).withMessage("text should be more than 20 character")
        ];
    };
};

module.exports = {
    ProjectValidator: new ProjectValidator()
};