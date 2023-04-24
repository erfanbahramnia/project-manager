const router = require("express").Router();
const { checkLogin } = require("../http/middlewares/checkLogin.js");
const { TeamController } = require("../http/controllers/team.controller.js");
const { TeamValidator } = require("../http/validations/team.validator.js");
const { expressValidator } = require("../http/middlewares/checkerror.js");
const { Validator } = require("../http/validations/public.validator.js");


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

/**
 * @swagger
 * /team/{id}:
 *  get:
 *      summary: get team by id
 *      tags: ["team"]
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *          - in: path
 *            name: id
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

router.get("/:id", checkLogin, Validator.mongoIdValidator(), expressValidator, TeamController.getTeamById)

/**
 * @swagger
 * /team/remove/{id}:
 *  get:
 *      summary: delete team by id
 *      tags: ["team"]
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *          - in: path
 *            name: id
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

router.get("/remove/:id", checkLogin, Validator.mongoIdValidator(), expressValidator, TeamController.removeTeamById)

/**
 * @swagger
 * /team/invite/{id}/{username}:
 *  get:
 *      summary: initing uer to team
 *      tags: ["team"]
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *      responses:
 *          "200":
 *              description: ok
 *          "400":
 *              description: bad request
 *          "500":
 *              description: internal server
 */

router.get("/invite/:id/:username", checkLogin, Validator.mongoIdValidator(), expressValidator, TeamController.inviteUserToTeam);

module.exports = {
    teamRoute: router
}