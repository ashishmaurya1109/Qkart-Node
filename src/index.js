const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

let server;

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
mongoose.connect(config.mongoose.url, config.mongoose.options) //(1)-> mongodb connection
.then(()=>{
    console.log(`DB connected successfully at ${config.mongoose.url}`)
    server = app.listen(config.port, ()=>{ //express server start (2)-> control reach app.js
        console.log(`Server running on PORT ${config.port}`)
    })
})
.catch((error)=>{
    console.log(`DB connection failed: ${error}`)
})
