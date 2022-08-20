const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const Chat = require("../models/chatSchema");

router.post("/api/like", async (req, res) => {
  const { chatID, userID } = req.body;
  console.log(chatID, userID);
  if (userID != null) {
    Chat.findById(chatID, async (err, chat) => {
      if (err) {
        console.log(err);
      } else {
        //if chat is found
        if (chat.likes.includes(userID)) {
          chat.likes.pull(userID);
          await chat.save();
          res.json({ message: "unliked", likeNo: chat.likes.length });
        } else {
          chat.likes.push(userID);
          await chat.save();
          res.json({ message: "liked", likeNo: chat.likes.length });
        }
      }
    });
  } else {
    res.status(400).json({ message: "Please login to like" });
  }
});

module.exports = router;
