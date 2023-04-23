const router = require("express").Router();
const { authRoute } = require("./auth.route.js");
const { userRoute } = require("./user.route.js");
const { projectRoute } = require("./project.route.js");
const { teamRoute } = require("./team.route.js");

// authorization and authentication
router.use("/auth", authRoute);
// user available apis
router.use("/user", userRoute);
// project apis
router.use("/project", projectRoute);
// team apis
router.use("/team", teamRoute);
module.exports = {
    allRoutes: router
};
