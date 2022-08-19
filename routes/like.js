const express= require("express");
const router= express.Router();
const User = require("../models/userSchema");
const Chat = require("../models/chatSchema");


router.post("/like", async(req,res)=>{
    const _id=req.body.id;
    const userId=req.body.userId;

    Chat.findOne({_id:_id}, async(err,foundChat)=>{
        if(foundChat){
          Chat.findOne({userId:userId},async(err, foundUser)=>{
            if(foundUser){
                foundChat.like--;
            }
            else{
                foundChat.userId.push(userId);
                foundChat.like++;
                foundChat.save();
                
            }
          })  
         
    }
})
});

module.exports=router;
