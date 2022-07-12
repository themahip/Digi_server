const express = require("express");

const User = require("../models/userSchema.js");
const {OAuth2Client}= require("google-auth-library");
const client = new OAuth2Client("602782645460-9d9ognvavgj0vi6ivk92na43ch14mjof.apps.googleusercontent.com");

const router = express.Router();

router.post("/googlelogin",async (req,res)=>{
    const {tokenId}= req.body;
    // console.log(tokenId);
     client.verifyIdToken({idToken:tokenId, audience:"602782645460-9d9ognvavgj0vi6ivk92na43ch14mjof.apps.googleusercontent.com"}).then(response=>{
  
       const {email, email_verified, at_hash, given_name}=response.payload;

       if(email_verified){
       User.findOne({email:email},async(error,foundUser)=>{
         if(foundUser){
          const token = await foundUser.generateAuthToken();

         
          console.log(token);
          res.status(200).send(token);


         }
   
         else{
           const password= at_hash;
           
           const newUser=new User({
             name:given_name,
             email,
             hashPassword:password
           });
           const token = newUser.generateAuthToken();
           res.status(200).send(token);
    
         }
       });
        
       
       }
     });
     
   });

   router.post("/facebooklogin",async(req,res)=>{
     
   })
   module.exports=router;
