const mongoose = require("mongoose");
// schema of Project Model
const ProjectSchema = require("./schemas/project.schema.js");

// create model of project and export it
module.exports = {
    ProjectModel: mongoose.model("project", ProjectSchema)
};