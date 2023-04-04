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

    async editProfile(req, res, next) {
        try {
            const data = req.body;
            const UserID = req.user._id;

            const keys = ["first_name", "last_name", "skills"];
            const fields = [null, undefined, "", " ", 0, NaN, -1];
            Object.entries(data).forEach(([key, value]) => {
                if(!keys.includes(key)) delete data[key];
                if(fields.includes(value)) delete data[key];
            });

            const result = await UserModel.updateOne({_id: UserID}, {
                $set: {
                    data
                }
            }); 
            console.log(result)
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    message: "update profile completed"
                });
            }; 
            throw {status: 400, message: "update failed!"}
        } catch (error) {
            next(error);
        }
    }
};

module.exports = {
    UserController: new UserController()
};