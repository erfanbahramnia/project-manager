const router = require("express").Router();
const { checkLogin } = require("../http/middlewares/checkLogin.js");
const { expressValidator } = require("../http/middlewares/checkerror.js");
const { ProjectValidator } = require("../http/validations/project.validator.js");
const { ProjectController } = require("../http/controllers/project.controller.js");
// create tag for auth
/**
 * @swagger
 * tags:
 *  name: project
 *  description: authorization and authentication of user
*/

// register section for signing up user
/**
 * @swagger
 * /project/create:
 *  post:
 *      summary: register new user
 *      tags: [project]
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *      requestBody:
 *          description: get user data
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

module.exports = {
    projectRoute: router
};