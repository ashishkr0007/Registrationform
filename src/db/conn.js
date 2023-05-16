require("dotenv").config();
const mongoose = require("mongoose"); //mongoose to connect mongoDB server

// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("connection succesfully");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;

//mongodb://127.0.0.1/MYRegistrationform
