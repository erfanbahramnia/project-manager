const { body } = require("express-validator");
const { TeamModel } = require("../../model/team.model.js");

class TeamValidator {
    create() {
        return [
            body("name").isLength({min: 3}).withMessage("name should be more than 3 character"),
            body("description").notEmpty().withMessage("description should not be empty"),
            body("username").custom(async(username) => {
                // check username is in especific pattern
                const checkUsername = /^[a-z][a-z0-9\_\.]{2,25}$/gim;
                if(!checkUsername.test(username)) throw {status: 400, message: "username is not valid"};
                // check username has already used
                const team = await TeamModel.findOne({username});
                if (team) throw {status: 400, message: "this username has already used!"};
                // validate successfully
                return true;
            })
        ];
    };
};

module.exports = {
    TeamValidator: new TeamValidator()
}