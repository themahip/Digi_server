const express= require("express");
const router= express.Router();
const dotenv= require("dotenv");
const User= require("../models/userSchema");
const cookieParser= require("cookie-parser");
const auth= require("../middleware/auth");
const jwt= require("jsonwebtoken");

router.use(cookieParser());
dotenv.config({path:"../config.env"});
router.post("/authenticate",async (req,res)=>
{ 

    try {
    
        const token= req.body.token;
        console.log(token);

        

        const sec=process.env.SECRET_KEY;
        const verifyUser= jwt.verify(token,sec);
       
        
        const user= await User.findOne({_id:verifyUser._id,"tokens.token":token});
        
        console.log(user);

        if(!user){
            res.status(202).send("user not found");
            // throw error;
        }
        else{
            res.status(200).send("user found")
        }
      
    
        
    } catch (error) {
        console.log("ERROR FOUND");
        res.status(202).send("user not found");
    }
});

module.exports=router;
