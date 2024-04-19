const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes/v1");
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const { jwtStrategy } = require("./config/passport");
const helmet = require("helmet");
const passport = require("passport");

const app = express();

// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet()); //used for security 

// parse json request body
app.use(express.json()); //require this middleware to parse json request body 

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression()); //to compress response 

// enable cors
app.use(cors()); //allows outside request(external) to be processed as default behaviour of any server is it rejects request coming from ouside the system
app.options("*", cors());

// TODO: CRIO_TASK_MODULE_AUTH - Initialize passport and add "jwt" authentication strategy
app.use(passport.initialize())
passport.use("jwt", jwtStrategy)

// Reroute all API request starting with "/v1" route
app.use("/v1", routes); //(3)-> control reaches index.js of v1 folder of routes folder

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

//errorConverter not using this middleware

// handle error
app.use(errorHandler);

module.exports = app;