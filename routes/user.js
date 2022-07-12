
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser= require("cookie-parser");
const validator = require("email-validator");
const User = require("../models/userSchema.js");
const { application } = require("express");

const router = express.Router();
router.use(cors());

router.use(cookieParser());

router.post("/api/register/", (req, res) => {
 
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
   
  
    if (!name || !email || !password || !password2) {
       res.status(221).json("Please fill in all fields" );
    } else if (password !== password2) {
       res.status(221).send("Password didn't match");
    } else if (password.length < 8) {
       res.status(221).json("Password must be 8 characters long.");
    } else if (!validator.validate(email)) {
      return res.status(221).send("Email not validated.");
    } else {
      const hashPassword = bcrypt.hashSync(password, 10);
 
      User.findOne({ email: email }, async (err, foundUser) => {
        if (err) {
          console.log(err);
        } else if (foundUser) {
           res.status(221).send("email already exist");
        } else {
          const newUser = new User({
            name,
            email,
            hashPassword,
          });
          const token = await newUser.generateAuthToken();

          res.status(200).send(token);
          console.log(token);
          const nuser = await newUser.save(() => {
            console.log("saved");
          });
        }
      });
    }
  });
  
  
  router.post("/api/login/", async (req, res) => {
   
    const email = req.body.username;
    const password = req.body.password;

    if (!email || !password) {
      res.status(221).send("Please fill the fields");
    }
    User.findOne({ email: email }, async (error, foundUser) => {
      if (error) {
     console.log(".");
      } else if (foundUser) {
        console.log("hello");
        const isMatch = await bcrypt.compare(password, foundUser.hashPassword);
  
        const token = await foundUser.generateAuthToken();

  
        if (isMatch) {
          console.log("Password matched");
          console.log(token);
          res.status(220).send(token);
          res.status(221).send("");
          console.log("Sent to json");
        } else {
          console.log("Not matched");
          res.status(221).json("email and password didn't match");
        }
      }
    });
  });
  
module.exports=router;