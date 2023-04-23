const { TeamModel } = require("../../model/team.model.js");

class TeamController {
    async createTeam(req, res, next) {
        try {
            // get data of new team
            const {name, description, username} = req.body;
            // id of team creator
            const owner = req.user._id;
            // create new team
            const team = await TeamModel.create({owner, name, description, username});
            // check if team created successfully
            if(!team) throw {status: 500, message: "creating new team failed"};
            // team created successfully
            res.status(200).json({
                status: 200,
                message: "team created successfully"
            });
        } catch (error) {
            // handle error
            next(error);
        }
    }
};

module.exports = {
    TeamController: new TeamController()
};