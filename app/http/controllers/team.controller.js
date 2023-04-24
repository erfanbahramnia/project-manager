const { TeamModel } = require("../../model/team.model.js");
const { createLinkForFiles } = require("../../utils/functions.js"); 

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
                        "owner.skills": 0,
                        "owner.inviteRequests": 0,
                    }
                },
                {
                    $unwind: "$owner"
                }
            ])
            // check teams found
            if(teams.length == 0) throw {status: 400, message: "user have no team"}
            // add links for profile imags
            teams.forEach(team => {
                team.owner.profile_image = createLinkForFiles(team.owner.profile_image, req);
            }) 
            res.status(200).json({
                status: 200,
                teams
            })
        } catch (error) {
            next(error);
        }
    };

    async getTeamById(req, res, next) {
        try {
            const mongoose = require("mongoose")
            // get team id
            const teamId = new mongoose.Types.ObjectId(req.params.id);
            // find project
            const team = await TeamModel.aggregate([
                {
                    $match: {
                        _id: teamId
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
                        "owner.skills": 0,
                        "owner.inviteRequests": 0,
                    }
                },
                {
                    $unwind: "$owner"
                }
            ]);
            // check team 
            if(team.length === 0) throw {status: 400, message: "there is no such this team"};
            // create link for profile image
            team[0].owner.profile_image = createLinkForFiles(team[0].owner.profile_image, req);
            // team found successfully
            res.status(200).json({
                status: 200,
                team
            });
        } catch (error) {
            // handle error
            next(error);
        };
    };

    async removeTeamById(req, res, next) {
        try {
            // get team id
            const teamId = req.params.id;
            // get user id
            const owner = req.user._id;
            // check that team exist or not
            const team = await TeamModel.findOne({owner, _id: teamId});
            if(!team) throw {status: 400, message: "there is no such this project"};
            // deleting team
            const removeResult = await TeamModel.deleteOne({owner, _id: teamId});
            // check team deleted
            if(removeResult.deletedCount == 0) throw {status: 500, message: "delete failed"};
            // team deleted successfully
            res.status(200).json({
                status: 200,
                message: "team deleted successfully"
            });
        } catch (error) {
            // handle error
            next(error);
        };
    };
};

module.exports = {
    TeamController: new TeamController()
};