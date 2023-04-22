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
        };
    };

    async getProjectById(req, res, next) {
        try {
            // get id of the project owner
            const owner = req.user._id;
            // get id of the project
            const projectId = req.params.id;
            // find project
            const project = await ProjectModel.findOne({owner, _id: projectId});
            // check if project exist
            if(!project) throw {status: 400, message: "there is no such this project"};
            // create link for image
            project.image = createLinkForFiles(project.image, req);
            // project found successfully
            res.status(200).json({
                status: 200,
                project
            });
        } catch (error) {
            // handle error
            next(error);
        }
    }

    async removeProjectById(req, res, next) {
        try {
            // get id of the project owner
            const owner = req.user._id;
            // get id of the project
            const projectId = req.params.id;
            // check if project exist
            const project = await ProjectModel.findOne({owner, _id: projectId});
            if(!project) throw {status: 400, message: "there is no such this project"}
            // delete project
            const removeResult = await ProjectModel.deleteOne({owner, _id: projectId});
            // check if project deletes
            if(removeResult.deletedCount === 0) throw {status: 500, message: "removing falid!"};
            // project deleted successfully
            res.status(200).json({
                status: 200,
                message: "project deleted successfully"
            });
        } catch (error) {
            // handle error
            next(error);
        };
    };

    async updateProjectById(req, res, next) {
        try {
            // get id of the project
            const {id: projectId} = req.params;
            // get id of the owner
            const owner = req.user._id; 
            // get new data of project
            const data = {...req.body};
            // validate new data
            Object.entries(data).forEach(([key, value]) => {
                if(!["title", "text", "tags"].includes(key)) delete data[key];
                if([" ", "", 0, 1, null, undefined, NaN].includes(typeof value === "string" ? value.trim() : '')) delete data[key];
                if(key == "tags" && (typeof data['tags'] === "array")) {
                    data["tags"] = data["tags"].filter(item => {
                        if(!["", " ", 0, 1, null, undefined, NaN].includes(item)) return item
                    });
                    if(data["tags"].length == 0) delete data["tags"];
                };
            })
            // check if project exist
            const project = await ProjectModel.findOne({owner, _id: projectId});
            if (!project) throw {status: 400, message: "there is no such this project"};
            // update the project
            const updateResult = await ProjectModel.updateOne({owner, _id: projectId}, {
                $set: {...data}
            });
            // check result of update
            if (updateResult.modifiedCount === 0) throw {status: 400, message: "update failed!"};
            // updated successfully
            res.status(200).json({
                status: 200,
                message: "prject updated successfully"
            })
        } catch (error) {
            next(error);
        }
    }

};

module.exports = {
    ProjectController: new ProjectController()
};