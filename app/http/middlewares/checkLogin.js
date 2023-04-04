// verify jwt token
const { verifyJwtToken } = require("../../utils/functions.js");
// finding user information
const { UserModel } = require("../../model/user.model.js");

const checkLogin = async (req, res, next) => {
    try {
        // take token from header
        const token = req?.headers?.token;
        // check token if exist
        if (!token) throw {status: 400, message: "please login to your account"};
        // verify the token
        const { username } = verifyJwtToken(token);
        // find user
        const user = await UserModel.findOne({username});
        // check that user exist
        if (!user) throw {status: 400, message: "there is no such this user"}; 
        // save user information in request
        req.user = user;
        next();
    } catch (error) {
        // handle the error
        next(error);
    };
};

module.exports = {
    checkLogin
}