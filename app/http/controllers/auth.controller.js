// user model for modifying the data in database
const { UserModel } = require("../../model/user.model.js");
// generateHassPass work for converting string to hash
// tokenGenerator work for create a token when user login
const { generateHashPass, tokenGenerator } = require("../../utils/functions.js");

class AuthController {
    async register(req, res, next) {
        // handle error if it occures
        try {
            // take data from the request body
            const {username, email, first_name, last_name, mobile, password} = req.body;
            // convert pass to hash
            const hashPass= generateHashPass(password);
            // create new user
            const createResult = await UserModel.create({
                username, email, first_name, last_name, mobile, password: hashPass 
            });
            // error handling if user already exist
            if (!createResult) throw {status: 500, message: "saving user information falied!"};
            // created new user successfully
            res.status(200).json({
                status: 200,
                message: createResult
            });
        } catch (error) {
            // handle error
            next(error);
        };
    };

    async login(req, res, next) {
        try {
            // get data from body
            const { username } = req.body;
            // find user
            const user = await UserModel.findOne({username});
            // handle error if user not found
            if (!user) throw {status: 400, message: "there is no such this user"};
            // create a new token for user
            const token = tokenGenerator({username});
            user.token = token;
            user.save();
            // login successfully
            res.status(200).json({
                status: 200,
                messaage: user
            });
        } catch (error) {
            next(error);
        };
    };
};  

module.exports = {
    AuthController: new AuthController()
};