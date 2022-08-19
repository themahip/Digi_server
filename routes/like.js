const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const chat = require("../models/chatSchema");

router.post("api/like", async (req, res) => {
    let id = req.body.id;
    let userId= req.body.userId;
    let like = req.body.like;
    chat.findOne({ id:_id}, async (err, afoundChat) => {
        if (foundChat){
            afoundChat.findOne({"userId.user":userId}, async (err, foundChat) => {
                if (foundChat){
                    afoundChat.like--;
                    afoundChat.deleteOne({ "userId.user":id});
                }
                else{
                    if(like===true){
                        foundChat.like++;
                        foundChat.getLikeUser(userId);
                    }
                }
            
            })
        }
    })

});
router.post("/api/seelike", async (req, res) => {
    let id = req.body.id;
    chat.findOne({ id: id }, async (err, foundChat) => {
        res.status(200).json(`${foundChat.like}`);
    })
})


