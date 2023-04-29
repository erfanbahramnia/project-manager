const router = require("express").Router();
// check for authorization
const { checkLogin } = require("../http/middlewares/checkLogin.js");
// controller of crud for user
const { UserController } = require("../http/controllers/user.controller.js");
//
const { upload_multer } = require("../utils/multer.js");
// 
const { UserValidator } = require("../http/validations/user.validator.js");
const { expressValidator } = require("../http/middlewares/checkerror.js")

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

/**
 * @swagger
 * /user/edit-profileImage:
 *  post:
 *      summary: edit profile image
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
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          "200":
 *              description: ok
 *          "400":
 *              description: bad request
 */

router.post("/edit-profileImage", checkLogin,
    upload_multer.single("image"),
    UserValidator.imageValidation(),
    expressValidator,
    UserController.uploadProfileImage
);

/**
 * @swagger
 * /user/allRequests:
 *  get:
 *      summary: show all requests of the user
 *      tags: ["user"]
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

router.get("/allRequests", checkLogin, UserController.getAllRequests);

module.exports = {
    userRoute: router
};