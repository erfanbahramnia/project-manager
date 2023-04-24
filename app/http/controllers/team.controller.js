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
        };
    };

    async getAllTeams(req, res, next) {
        try {
            // get all teams
            const teams = await TeamModel.find({});
            // send teams
            res.status(200).json({
                status: 200,
                teams
            })
        } catch (error) {
            next(error);
        };
    };

    async getMyTeams(req, res, next) {
        try {
            // get user id for finding the teams
            const userId = req.user._id;
            // find teams and add user informations in it
            const teams = await TeamModel.aggregate([
                {
                    $match: {
                        $or: [{owner: userId},{users: userId}]
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner"
                    }
                },
                {
                    $project: {
                        "owner.roles": 0,
                        "owner.password": 0,
                        "owner.token": 0,
                        "owner.teams": 0,
                        "owner.skillds": 0,
                        "owner.inviteRequests": 0,
                    }
                },
                {
                    $unwind: "$owner"
                }
            ])
            res.status(200).json({
                status: 200,
                teams
            })
        } catch (error) {
            next(error);
        }
    }
};

module.exports = {
    TeamController: new TeamController()
};