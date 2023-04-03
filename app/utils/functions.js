const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

// convert string to hash
const generateHashPass = (data) => {
    const salt = bcrypt.genSaltSync(0)
    return bcrypt.hashSync(data, salt);
};

// compare str pass with hash pass
const comparePass = (str, hash) => {
    const result = bcrypt.compareSync(str, hash)
    return !!result;
};

// generate token when user login
const tokenGenerator = (payload) => {
    const token = Jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "3 Days"});
    return token;
}

module.exports = {
    generateHashPass,
    comparePass,
    tokenGenerator
};