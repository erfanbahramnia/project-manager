const { ProjectModel } = require("../../model/project.model.js");

class ProjectController {
    async createProject(req, res, next) {
        try {
            // get project data from body
            const { title, text } = req.body;
            // get id of project owner
            const owner = req.user._id
            // create new project
            const result = await ProjectModel.create({title, text, owner})
            // handle error if project have not been created
            if (!result) throw {status: 500, message: "create of project failed"};
            // project created successfully
            res.status(200).json({
                status: 200,
                messsage: "project created successfully"
            })
        } catch (error) {
            // handle error
            next(error);
        };
    };
};

module.exports = {
    ProjectController: new ProjectController()
};