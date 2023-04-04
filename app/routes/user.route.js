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

router.get("/get-profile", checkLogin, UserController.getProfile)

module.exports = {
    userRoute: router
};