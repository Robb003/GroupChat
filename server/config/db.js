//import mongoose to help you talk with mongodb using js
const mongoose = require("mongoose");

//function to connect server with mongodb
const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI_PRODUCTION);
        console.log("MongoDB Connected Successfully");
    } catch(error) {
        console.error("MongoDB connection failed", error.message);
        process.exit(1);
    }
};
module.exports = connectDB;
