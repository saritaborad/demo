const mongoose = require("mongoose");

const connectDB = () => {
 mongoose.connect(process.env.MONGOURL).then(() => {
  console.log("MongoDB connected!");
 });
};

module.exports = connectDB;
