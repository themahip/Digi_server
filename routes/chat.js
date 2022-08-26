const express = require("express");
const router = express.Router();
const Chat = require("../models/chatSchema");

router.post("/api/publishChat", async (req, res) => {
  let { title, sender, chat } = req.body;
  let newChat = new Chat({
    title: title,
    sender: sender,
    chat: chat,
    like: 0,
  });
  await newChat.save(() => {
    res.status(220).json();
  });
});

router.get("/api/fetchChat", async (req, res) => {
  Chat.find({}, (err, chats) => {
    res.status(220).json(chats);
  });
});

router.post("/api/individualChat", async (req, res) => {
  const { chatID, userID } = req.body; //chatID is the id of the chat, userID is the id of the user
  Chat.findById(chatID, async (err, chat) => {
    if (err) {
      console.log(err);
    } else if (!chat) {
      res.status(400).json("Chat Not Found");
    } else {
      if (userID) {
        if (chat.likes.includes(userID)) {
          res
            .status(200)
            .json({ chat, liked: true, likeNo: chat.likes.length }); //if the user has liked the chat, return true and the number of likes
        } else {
          res
            .status(200)
            .json({ chat, liked: false, likeNo: chat.likes.length }); //if the user has not liked the chat, return false and the number of likes
        }
      } else {
        res.status(200).json({ chat, likeNo: chat.likes.length }); //if the user is not logged in, return the chat
      }
    }
  });
});

module.exports = router;
