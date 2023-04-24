const router = require("express").Router();
const { checkLogin } = require("../http/middlewares/checkLogin.js");
const { TeamModel } = require("../model/team.model.js");
const { TeamController } = require("../http/controllers/team.controller.js");
const { TeamValidator } = require("../http/validations/team.validator.js");
const { expressValidator } = require("../http/middlewares/checkerror.js");

// create tag for team
/**
 * @swagger
 * tags:
 *  name: team
 *  description: create and remove team and invite or reject people
*/

/** 
 * @swagger
 * /team/create:
 *  post:
 *      summary: creating new team
 *      tags: ["team"]
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *      requestBody: 
 *          description: data of the new project
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          username:
 *                              type: string
 *      responses:
 *          "200":
 *              description: "*ok*"
 *          "400":
 *              description: "*bad request*"
*/

router.post("/create", checkLogin, TeamValidator.create(), expressValidator, TeamController.createTeam);

/**
 * @swagger
 * /team/allTeams:
 *  get:
 *      description: get all teams
 *      tags: ["team"]
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *      responses:
 *          "200":
 *              description: ok
 *          "400":
 *              description: bad request
 *          "500":
 *              description: internal server error
 */

router.get("/allTeams", checkLogin, TeamController.getAllTeams);

/**
 * @swagger
 * /team/myTeams:
 *  get:
 *      description: get all teams of the user
 *      tags: ["team"]
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *      responses:
 *          "200":
 *              description: ok
 *          "400":
 *              description: bad request
 *          "500":
 *              description: internal server error
 */

router.get("/myTeams", checkLogin, TeamController.getMyTeams);

module.exports = {
    teamRoute: router
}