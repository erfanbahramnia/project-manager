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
};

const verifyJwtToken = (token) => {
    // verify jsonwebtoken code 
    const user = Jwt.verify(token, process.env.SECRET_KEY);
    // if token is not valid handle the error
    if (!user?.username) throw {status: 400, message: "please login to your account"};
    // verifyed successfully
    return user;
};

module.exports = {
    generateHashPass,
    comparePass,
    tokenGenerator,
    verifyJwtToken
};