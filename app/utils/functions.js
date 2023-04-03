const bcrypt = require("bcrypt");

// convert string to hash
const generateHashPass = (data) => {
    const salt = bcrypt.genSaltSync(0)
    return bcrypt.hashSync(data, salt);
};

module.exports = {
    generateHashPass,
};