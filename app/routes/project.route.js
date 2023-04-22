const router = require("express").Router();
const { checkLogin } = require("../http/middlewares/checkLogin.js");
const { expressValidator } = require("../http/middlewares/checkerror.js");
const { ProjectValidator } = require("../http/validations/project.validator.js");
const { ProjectController } = require("../http/controllers/project.controller.js");
const { uploadFile } = require("../utils/express-fileupload.js");
const fileUpload = require("express-fileupload");

// create tag for project
/**
 * @swagger
 * tags:
 *  name: project
 *  description: authorization and authentication of project
*/

// register section for signing up project
/**
 * @swagger
 * /project/create:
 *  post:
 *      summary: register new project
 *      tags: [project]
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *      requestBody:
 *          description: get project data
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      title: 
 *                          type: string
 *                      text: 
 *                          type: string
 *      responses:
 *          "200":
 *              description: "*ok*"
 *          "400":
 *              description: "*bad request*"
 * 
 */
router.post("/create", checkLogin, ProjectValidator.create(), expressValidator, ProjectController.createProject);

/**
*  @swagger
*  /project/edit-projectImage/{projectId}:
*   post:
*       summary: edit project image
*       tags: ["project"]
*       parameters:
*         - in: path
*           name: projectId
*           schema:
*              type: string
*           required: true
*         - in: header
*           name: token
*           schema:
*               type: string
*           required: true
*       requestBody:
*           description: update image of project 
*           required: true
*           content:
*               multipart/form-data:
*                   schema:
*                       type: object
*                       properties:
*                           image:
*                               type: string
*                               format: binary
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           projectId:
*                               type: string
*                       
*       responses:
*           "200":
*               description: ok
*           "400":
*               description: bad request
*/ 
router.post("/edit-projectImage/:projectId", 
    checkLogin,
    fileUpload(),
    ProjectValidator.imageUpdateValidator(),
    uploadFile,
    expressValidator,
    ProjectController.uploadProjectImage
);

/**
* @swagger
* /project/getAllProjects:
*   get:
*       summary: get All user project
*       tags: ["project"]
*       parameters:
*         - in: header
*           name: token
*           schema:
*               type: string
*           required: true 
*       responses:
*        "200":
*            description: ok
*        "400":
*            description: bad request
 */

router.get("/getAllProjects", checkLogin, ProjectController.getAllProjects);

module.exports = {
    projectRoute: router
};
