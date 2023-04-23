const mongoose = require("mongoose");

// create seperate schema of invite requests of user
const InviteRequest = new mongoose.Schema({
    teamId: {type: mongoose.Types.ObjectId, required: true},
    caller: {type: String, required: true, lowercase: true},
    requestData: {type: Date, default: new Date()},
    status: {type: String, default: "pending"} // rejected - accepted - pending
})

// data that should saved when user sign up
const UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    mobile: {type: String, required: true, unique: true},
    roles: {type: [String], default: ["USER"]},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    skills: {type: [String], default: []},
    teams: {type: [mongoose.Types.ObjectId], default: []},
    token: {type: String, default: ""},
    profile_image: {type: String, default: "defaults/default.jpg"},
    inviteRequest: {type: [InviteRequest]}
}, {
    timestamps: true
});

module.exports = UserSchema;