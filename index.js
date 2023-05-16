require("dotenv").config();
const express = require("express");
const app = express();
const hbs = require("hbs"); //ejs
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const connectDB = require("./db/conn");
require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;

app.use(express.static("public")); //using public folder
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs"); //for using hbs
app.set("views", template_path);
hbs.registerPartials(partials_path);
//console.log(process.env.SECRET_KEY);
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// create a new user in our database
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerEmployee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      });

      //console.log("the success part" + registerEmployee);

      const token = await registerEmployee.generateAuthToken();
      //console.log("the token part" + token);

      const registered = await registerEmployee.save();
      //console.log("the page part" + registered);

      res.status(201).render("index");
    } else {
      res.send("password are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
    console.log("the error part page ");
  }
});

// login check

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, useremail.password);

    const token = await useremail.generateAuthToken();
    //console.log("the token part" + token);

    if (isMatch) {
      res.status(201).render("index");
    } else {
      res.send("invalid Password Details");
    }
  } catch (error) {
    res.status(400).send("invalid login Details");
  }
});
//Connect to the database before listening
connectDB().then(() => {
  app.listen(port, () => {
    console.log("server listening for requests");
  });
});
