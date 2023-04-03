const router = require("express").Router();
const { authRoute } = require("./auth.route.js");

// authorization and authentication
router.use("/auth", authRoute);

module.exports = {
    allRoutes: router
};
