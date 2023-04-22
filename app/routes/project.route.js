const router = require("express").Router();
const { checkLogin } = require("../http/middlewares/checkLogin.js");
const { expressValidator } = require("../http/middlewares/checkerror.js");
const { ProjectValidator } = require("../http/validations/project.validator.js");
const { ProjectController } = require("../http/controllers/project.controller.js");
const { uploadFile } = require("../utils/express-fileupload.js");
const fileUpload = require("express-fileupload");
const { Validator } = require("../http/validations/public.validator.js");

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

router.get("/getAllProjects", checkLogin, expressValidator, ProjectController.getAllProjects);

/**
 * @swagger
 * /project/{id}:
 *  get:
 *      summary: get user's project by its id
 *      tags: ["project"]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *       "200":
 *           description: ok
 *       "400":
 *           description: bad request
 *       "500":
 *           description: internal server error
 */

router.get("/:id", checkLogin, Validator.mongoIdValidator(), expressValidator, ProjectController.getProjectById)

/**
 * @swagger
 * /project/remove/{id}:
 *  get:
 *      summary: remove project by id
 *      tags: ["project"]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *       "200":
 *           description: ok
 *       "400":
 *           description: bad request
 *       "500":
 *           description: internal server error
 */

router.get("/remove/:id", checkLogin, Validator.mongoIdValidator(), expressValidator, ProjectController.removeProjectById)

/**
 * @swagger
 * /project/update/{id}:
 *  put:
 *      summary: update project by id
 *      tags: [project]
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *          - in: path
 *            name: id
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
 *                      tags:
 *                          type: array
 *                          items:
 *                              type: string
 *      responses:
 *          "200":
 *              description: "*ok*"
 *          "400":
 *              description: "*bad request*"
 * 
 */
router.put("/update/:id", checkLogin, Validator.mongoIdValidator(), ProjectValidator.update(), expressValidator, ProjectController.updateProjectById);


module.exports = {
    projectRoute: router
};
