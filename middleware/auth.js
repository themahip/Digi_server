const express=require("express");
const cookieParser = require("cookie-parser");
const jwt= require("jsonwebtoken");
const User= require("../models/userSchema");
const dotenv= require("dotenv");
const app= express();

app.use(cookieParser());
dotenv.config({path:"../config.env"});

const auth= async (req,res,next)=>{

    try {
        console.log(req.body);
        if(!token){
            throw error;
        }
        const token= req.cookies.token;
       
   
        
        
        const sec=process.env.SECRET_KEY;
        const verifyUser= jwt.verify(token,sec);
        
        const user= await User.findOne({_id:verifyUser._id,"tokens.token":token});
        if(!user){
            throw error;
        }
        req.user=user;
        next();
    } catch (error) {
        console.log("hello");
        res.status(201).send();
    }
    }
    

