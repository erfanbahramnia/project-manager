// for vaidate the data of body
const { body } = require("express-validator");
// for validation the data 
const { UserModel } = require("../../model/user.model.js");
// compare str pass with hash pass
const { comparePass } = require("../../utils/functions.js");

// for authorization and authentication
class AuthValidator {
    // validate the data of new user
    register() {
        return [
            // validate first name
            body("first_name").notEmpty().withMessage("please enter your first name").custom(name => {
                if (!name) throw {status: 400, message: "please enter your first name"};
                // chech name that follow specific pattern
                const namePattern = /[a-z]{3,20}/gi;
                if(!namePattern.test(name)) throw {status: 400, message: "character name must be more than 3 character and less then 20"}
                return true;
            }),
            // validate last name
            body("last_name").notEmpty().withMessage("please enter your last name").custom(name => {
                if (!name) throw {status: 400, message: "please enter your last name"};
                // chech name that follow specific pattern
                const namePattern = /[a-z]{3,30}/gi;
                if(!namePattern.test(name)) throw {status: 400, message: "character name must be more than 3 character and less then 30"}
                return true;
            }),
            // validate username
            body("username").notEmpty().withMessage("username should not be empty").custom(async (username) => {
                // if username is empty send error
                if (!username) throw {status: 400, message: "username should not be empty"};
                // chech username that follow specific pattern
                const usernamePattern = /[a-z]{1}[a-z0-9\.\_]{2,}/gi;
                if (!usernamePattern.test(username)) throw {status: 400, message: "please enter a valid username"};
                // check that username have been used
                const user = await UserModel.findOne({username});
                if (user) throw {status: 400, message: "this username has already used"};
                // username validate successfuly
                return true;
            }),
            // validate email
            body("email").isEmail().withMessage("please enter a valid email").custom(async (email) => {
                // if email is empty send error
                if (!email) throw {status: 400, message: "email should not be empty"};
                // check that email have been used
                const user = await UserModel.findOne({email});
                if (user) throw {status: 400, message: "this email has already used"};
                // email validate successfuly
                return true;
            }),
            body("mobile").isMobilePhone("fa-IR").withMessage("please enter a valid phone number").custom(async (mobile) => {
                // if mobile is empty send error
                if (!mobile) throw {status: 400, message: "phone number should not be empty"};
                // check that mobile have been used
                const user = await UserModel.findOne({mobile});
                if (user) throw {status: 400, message: "this phone number has already used"};
                // mobile validate successfuly
                return true;
            }),
            body("password").isLength({min: 6, max: 16}).withMessage("password character amount between 6 and 16").custom(async (password, {req}) => {
                // if password is empty send error
                if (!password) throw {status: 400, message: "password should not be empty"};
                // chech password match with confirm password
                const { confirm_password } = req?.body;
                if (password !== confirm_password) throw {status: 400, message: "password does not match with confirm password"};
                // password validate successfuly
                return true;
            }),
        ];
    };

    // validate user login
    login() {
        return [
            body("username").notEmpty().withMessage("username should not be empty").custom(async (username) => {
                // if username is empty send error
                if (!username) throw {status: 400, message: "username should not be empty"};
                // chech username that follow specific pattern
                const usernamePattern = /[a-z]{1}[a-z0-9\.\_]{2,}/gi;
                if (!usernamePattern.test(username)) throw {status: 400, message: "please enter a valid username"};
                // check that user exist
                const user = await UserModel.findOne({username});
                if (!user) throw {status: 400, message: "there is no such this username"};
                // username validate successfuly
                return true;
            }),
            body("password").isLength({min: 6, max: 16}).withMessage("password character amount between 6 and 16").custom(async (password, {req}) => {
                // if password is empty send error
                if (!password) throw {status: 400, message: "password should not be empty"};
                // get hash password
                const { username } = req.body;
                const user = await UserModel.findOne({ username });
                // compare the str pass and hash pass
                const result = comparePass(password, user.password)
                // handle error if password is incorrect
                if (!result) throw {status: 400, message: "password is incorrect"}; 
                // password validate successfuly
                return true;
            })
        ];
    };
};

module.exports = {
    AuthValidator: new AuthValidator()
};