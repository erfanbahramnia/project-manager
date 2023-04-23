const mongoose = require("mongoose");
// schema of the project
const TeamSchema = require("./schemas/team.schema.js");
// export model
module.exports = {
    TeamModel: mongoose.model("team", TeamSchema)
}