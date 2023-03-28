const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const http = require("http");

class Application {
    #app = express();
    #PORT
    #DB_URL
    constructor(PORT, DB_URL) {
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;

        this.#configApplication();
        this.#configDataBase();
        this.#createServer();
        this.#createRoutes();
        this.#errorHandler();
    };

    #configApplication() {
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
    };

    #configDataBase() {
        mongoose.connect(this.#DB_URL);
        mongoose.connection.on("connected", () => {
            console.log("connected to DB...");
        });
        mongoose.connection.on("disconnected", () => {
            console.log("disconnected to DB...");
        });
        process.on("SIGINT", async() => {
            await mongoose.connection.close();
            console.log("disconnected!");
            process.exit(0);
        });
    };

    #createServer() {
        const server = http.createServer(this.#app);
        server.listen(this.#PORT, () => {
            console.log(`server is runnig on: http://localhost:${this.#PORT}`);
        });
    };

    #createRoutes() {
        
    };

    #errorHandler() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                message: "Not Found!"
            });
        });

        this.#app.use((error, req, res, next) => {
            const status = error.status || error.statusCode || 500;
            const message = error.message || "Internal Server Error";
            return res.status(status).json({
                status,
                message
            });
        });
    };
};

module.exports = Application;