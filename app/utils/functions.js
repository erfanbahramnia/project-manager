const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

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

// create a path with date of now
const createPathDirectory = () => {
    // create a new path based on date
    const date = new Date();
    const Day = date.getDay().toString();
    const Month = date.getMonth().toString();
    const Year = date.getFullYear().toString();
    // create new path
    const uploadPath = path.join(__dirname, "..", "..", "public", "uploads", Year, Month, Day);
    // creake directory
    fs.mkdirSync(uploadPath, {recursive: true});
    // return new path
    return path.join("public", "uploads", Year, Month, Day);
};

const createLinkForFiles = (filePath, req) => {
    const newPath = filePath ? `${req.protocol}://${req.get("host")}/${filePath.replace(/[\\\\]/gm, "/")}` : undefined;
    return newPath;
};

module.exports = {
    generateHashPass,
    comparePass,
    tokenGenerator,
    verifyJwtToken,
    createPathDirectory,
    createLinkForFiles
};