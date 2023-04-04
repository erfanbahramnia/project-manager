const router = require("express").Router();
// check for authorization
const { checkLogin } = require("../http/middlewares/checkLogin.js");
// controller of crud for user
const { UserController } = require("../http/controllers/user.controller.js");

/**
 * @swagger
 * tags:
 *  name: user
 *  description: user available apis
 */


/**
 * @swagger
 * /user/get-profile:
 *  get:
 *      summary: get profile
 *      tags: ["user"]
 *      description: get data of user that already registered
 *      parameters:
 *        - in: header
 *          name: token
 *          schema:
 *              type: string
 *          required: true
 *      responses:
 *          "200":
 *              description: ok
 *          "400":
 *              description: bad request
 */

router.get("/get-profile", checkLogin, UserController.getProfile);

/**
 * @swagger
 * /user/edit-profile:
 *  post:
 *      summary: edit profile
 *      tags: ["user"]
 *      parameters:
 *        - in: header
 *          name: token
 *          schema:
 *              type: string
 *          required: true
 *      requestBody:
 *          description: update data of user
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
 *                      skills: 
 *                          type: array
 *                          items:
 *                              type: string
 *      responses:
 *          "200":
 *              description: ok
 *          "400":
 *              description: bad request
 */

router.post("/edit-profile", checkLogin, UserController.editProfile);

module.exports = {
    userRoute: router
};