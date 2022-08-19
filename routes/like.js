const express= require("express");
const router= express.Router();
const User = require("../models/userSchema");
const Chat = require("../models/chatSchema");


router.post("/like", async(req,res)=>{
    const _id=req.body.id;
    // const userId=req.body.userId;
    // const like=req.body.like;
    Chat.findOne({_id:_id}, async(err,foundChat)=>{
        if(foundChat){
            
        }
      
    })
})

// router.post("api/like", async (req, res) => {
//     const id = req.body.id;
//     console.log(id);
    // let userId= req.body.userId;
    // let like = req.body.like;
    
    // chat.findOne({_id:id},async(err,foundChat)=>{
    //     if(foundChat){
    //         console.log("found chat");
    //     }
    // })




    
    // chat.findOne({ id:_id}, async (err, afoundChat) => {
    //     if (foundChat){
    //         afoundChat.findOne({"userId.user":userId}, async (err, foundChat) => {
    //             if (foundChat){
    //                 afoundChat.like--;
    //                 afoundChat.deleteOne({ "userId.user":id});
    //             }
    //             else{
    //                 if(like===true){
    //                     foundChat.like++;
    //                     foundChat.getLikeUser(userId);
    //                 }
    //             }
            
    //         })
    //     }
    // })

// });

module.exports=router;
