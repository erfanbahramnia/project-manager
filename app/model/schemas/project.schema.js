const mongoose = require("mongoose");

// datas that should saved when project created
const ProjectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    owner: {type: mongoose.Types.ObjectId, required: true},
    image: {type: String, default: "defaults/default.jpg"},
    team: {type: mongoose.Types.ObjectId},
    private: {type: Boolean, default: true}
}, {
    timestamps: true
});

module.exports = ProjectSchema;