/** @format */

const mongoose = require("mongoose");

const URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.iqvmc.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection Failed");
  }
};
module.exports = connectDB;
