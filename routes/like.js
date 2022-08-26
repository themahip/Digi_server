const express= require("express");
const router= express.Router();
const User = require("../models/userSchema");
const Chat = require("../models/chatSchema");
const { clear } = require("google-auth-library/build/src/auth/envDetect");


router.post("/like", async(req,res)=>{
    const _id=req.body.id;
    const userId=req.body.userId;

    Chat.findOne({_id:_id}, async(err,foundChat)=>{
        if(foundChat){
            const num= foundChat.userId.length;
           
            for(let i=0; i<num; i++){
                if(foundChat.userId[i]===userId){
                   
                    Chat.updateOne({_id:_id},{$pull:{userId:`${userId}`}},(err,result)=>{
                        if(err){
                          console.log(err);
                        }
                        else{
                            console.log(result);
                        }
                    });
                   
                   
                }
                else{
                
                    Chat.updateOne({_id:_id},{$push:{userId:[`${userId}`]}},(err,result)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(result);
                        }
                    });
                }
               
            }
         
    }
})
});

module.exports=router;
