const { validationResult } = require("express-validator");

// handle the errors of the validatins
const expressValidator = (req, res, next) => {
    try {
        // save error if exists
        const errors = {};
        // result of the validation of the data
        const result = validationResult(req);
        // check if error exist
        if (result?.errors?.length > 0) {
            // save errors in a object
            result.errors.forEach(error => {
                errors[error.param] = error.msg.message;
            });
            // sending erros
            res.json({
                status: 400,
                errors
            });
        };
        // validation completed
        next();
    } catch (error) {
        // handle the error
        next(error);
    };
};

module.exports = {
    expressValidator
};