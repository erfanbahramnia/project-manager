const { param } = require("express-validator");

class Validator {
    mongoIdValidator() {
        return [
            param("id").isMongoId().withMessage({status: 400, message: "Id is not valid"})
        ];
    };
};

module.exports = {
    Validator: new Validator()
};