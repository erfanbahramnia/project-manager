const { UserModel } = require("../../model/user.model.js");

class UserController {
    getProfile(req, res, next) {
        try {
            // take data of user that have been
            const user = req.user;
            // change to complete path so can see it
            user.profile_image = `${req.protocol}://${req.get("host")}${user.profile_image}`;            
            // response the data of user
            res.status(200).json({
                status: 200,
                user
            });
        } catch (error) {
            // handle error
            next(error);
        };
    };
};

module.exports = {
    UserController: new UserController()
};