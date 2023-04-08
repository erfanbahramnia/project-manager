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
            // get data of request body
            const data = req.body;
            // take id of user 
            const UserID = req.user._id;

            // delete unexpectable values
            const keys = ["first_name", "last_name", "skills"];
            const fields = [null, undefined, "", " ", 0, NaN, -1];
            Object.entries(data).forEach(([key, value]) => {
                if(!keys.includes(key)) delete data[key];
                if(fields.includes(value)) delete data[key];
            });

            // find user and update the data
            const result = await UserModel.updateOne({_id: UserID}, {
                $set: {
                    data
                }
            }); 
            // check modified values
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    message: "update profile completed"
                });
            }; 
            throw {status: 400, message: "update failed!"}
        } catch (error) {
            // handle error
            next(error);
        }
    };

    async uploadProfileImage(req, res, next) {
        try {
            //get user id for change the image
            const UserID = req.user._id;
            // get path of the image
            const filePath = req?.file?.path;
            // update image of profile
            const result = await UserModel.updateOne({_id: UserID}, {profile_image: filePath});
            // handle error if update of image failed
            if (result.modifiedCount == 0) throw {status: 400, message: "upload failed"};
            // updated successfully
            return res.status(200).json({
                status: 200,
                message: "upload completed"
            });
        } catch (error) {
            // handle the error
            next(error);
        };
    };
};

module.exports = {
    UserController: new UserController()
};