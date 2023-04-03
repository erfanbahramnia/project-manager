const router = require("express").Router();
// controller of authentication and authorization
const { AuthController } = require("../http/controllers/auth.controller.js");
// validator of authentication and authorization
const { AuthValidator } = require("../http/validations/auth.validator.js");
// handle errors of the validations
const { expressValidator } = require("../http/middlewares/checkerror.js");

// create tag for auth
/**
 * @swagger
 * tags:
 *  name: auth
 *  description: authorization and authentication of user
*/

// register section for signing up user
/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: register new user
 *      tags: [auth]
 *      requestBody:
 *          description: get user data
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      first_name: 
 *                          type: string
 *                      last_name: 
 *                          type: string
 *                      username: 
 *                          type: string
 *                      email: 
 *                          type: string
 *                      mobile:
 *                          type: string
 *                      password: 
 *                          type: string
 *                      confirm_password: 
 *                          type: string
 *      responses:
 *          "200":
 *              description: "*ok*"
 *          "400":
 *              description: "*bad request*"
 * 
 */
// register new user
router.post("/register", AuthValidator.register(), expressValidator, AuthController.register);

// register section for signing up user
/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: register new user
 *      tags: [auth]
 *      requestBody:
 *          description: get user data
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      username: 
 *                          type: string
 *                      password: 
 *                          type: string
 *      responses:
 *          "200":
 *              description: "*ok*"
 *          "400":
 *              description: "*bad request*"
 * 
 */
// register new user
router.post("/login", AuthValidator.login(), expressValidator, AuthController.login);

module.exports = {
    authRoute: router
};