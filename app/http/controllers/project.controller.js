const { ProjectModel } = require("../../model/project.model.js");
const { createLinkForFiles } = require("../../utils/functions.js"); 
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

    async uploadProjectImage(req, res, next) {
        try {
            // get path of the image
            const { image } = req.body;
            // get id of project from request
            const { projectId } = req.params;
            // get projects owner id
            const owner = req.user._id;
            // update the projects image
            const projectUpdateResult = await ProjectModel.updateOne({_id: projectId, owner}, {
                $set: {image}
            });
            // check update 
            if (projectUpdateResult.modifiedCount == 0) throw {status: 500, message: "update falied"};
            // image of project updated successfully
            res.status(200).json({
                status: 200,
                message: "updated successfully"
            });
        } catch (error) {
            // handle error
            next(error);
        };
    };

    async getAllProjects(req, res, next) {
        try {
            // get user id
            const owner = req.user._id;
            // find all projects that user is their owner
            const projects = await ProjectModel.find({owner});
            // check there is a project
            if (!projects) throw {status: 400, message: "you have no project"};
            // create links for images of the projects
            for (const project of projects) {
                project.image = createLinkForFiles(project.image, req);
            }
            // send projects
            res.status(200).json({
                status: 200,
                projects
            })
        } catch (error) {
            // handle errors
            next(error)
        }
    }
};

module.exports = {
    ProjectController: new ProjectController()
};