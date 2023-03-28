const Application = require("./app/server.js");

const PORT = 3000;
const DB_URL = "mongodb://127.0.0.1:27017/project-manager-db";
new Application(PORT, DB_URL);