const router = require("express").Router();
const { authRoute } = require("./auth.route.js");
const { userRoute } = require("./user.route.js");

// authorization and authentication
router.use("/auth", authRoute);
// user available apis
router.use("/user", userRoute);

module.exports = {
    allRoutes: router
};
