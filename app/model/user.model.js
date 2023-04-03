const mongoose = require("mongoose");
// schema of user for validation
const UserSchema = require("./schemas/user.schema.js");

// export user model for manipulation
module.exports = {
    UserModel: mongoose.model("user", UserSchema)
};
