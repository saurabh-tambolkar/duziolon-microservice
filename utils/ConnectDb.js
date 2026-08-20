const mongoose = require("mongoose");

async function ConnectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Microservice connected successfully to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

module.exports = {
    ConnectDb,
};