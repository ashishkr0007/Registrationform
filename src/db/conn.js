require("dotenv").config();
const mongoose = require("mongoose"); //mongoose to connect mongoDB server

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection succesfully");
  })
  .catch((e) => {
    console.log(e);
  });
