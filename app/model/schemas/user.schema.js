const mongoose = require("mongoose");

// datas that should saved when user sign up
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
    profile_image: {type: String, default: "/defaults/default.jpg"},
}, {
    timestamps: true
});

module.exports = UserSchema;