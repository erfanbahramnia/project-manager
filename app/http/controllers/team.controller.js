const { TeamModel } = require("../../model/team.model.js");
const { UserModel } = require("../../model/user.model.js");
const { createLinkForFiles } = require("../../utils/functions.js");
const  autoBind = require("auto-bind");

class TeamController {
    constructor() {
        autoBind(this)
    }

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

    async findUserInTeam(teamId, userId) {
        const result = await TeamModel.findOne({
            $or: [{owner: userId}, {users: userId}],
            _id: teamId
        });
        return !!result;
    };

    async inviteUserToTeam(req, res, next) {
        try {
            // get team id and username of person gonno invited to team
            const {id: teamId, username} = req.params
            // get user id
            const owner = req.user._id
            // check user is a member in team
            const team = await this.findUserInTeam(teamId, owner)
            if (!team) throw {status: 400, message: "there is no such this team or you're not a member in that team"};
            // find user that gonno invite to the team
            const user = await UserModel.findOne({username});
            if (!user) throw {status: 400, message: "there is no such this user"}
            // check user that gonno invite to the team has already in team
            const invitedUser = await this.findUserInTeam(teamId, user._id);
            if (invitedUser) throw {status: 400, message: "this user has already in team"};
            // create request for user
            const request = {
                caller: owner,
                status: "pendeng",
                requestDate: new Date(),
                teamId
            };
            // update resqust of user
            const updateResult = await UserModel.updateOne({username}, {
                $push: {inviteRequest: request}
            });
            // check update
            if (updateResult.modifiedCount === 0) throw {status: 500, message: "update failed!"}
            // request send successfully
            res.status(200).json({
                status: 200,
                message: "request send successfully"
            });
        } catch (error) {
            // handle error
            next(error);
        }
    }

    async updateTeam(req, res, next) {
        try {
            // get id of the team
            const {id} = req.params;
            // get id of user
            const owner = req.user._id;
            // check if team exist
            const team = await TeamModel.findOne({_id: id, owner});
            if (!team) throw {status: 400, message: "there is no such this team"};
            // get new data
            let data = {...req.body};
            // validate new data
            Object.entries(data).forEach(async([key, value]) => {
                if(!value) throw {status: 400, message: "value is not valid"};
                if(!["username", "name", "description"].includes(key)) throw {status: 400, message: "key is not valid"};
            });
            // check username have not already used
            if(data["username"]) {
                const isTeamExist = await TeamModel.findOne({username: data["username"]});
                if(isTeamExist) throw {status: 400, message: "this username has already used!"};
            }
            // update the team
            const updateResult = await TeamModel.updateOne({owner, _id: id}, {
                $set: {...data}
            });
            // check update
            if (updateResult.modifiedCount == 0) throw {status: 500, message: "update Faild!"}
            // updated successfully
            res.status(200).json({
                status: 200,
                message: "updates successfully"
            })
        } catch (error) {
            // handle error
            next(error)
        }
    }
};

module.exports = {
    TeamController: new TeamController()
};