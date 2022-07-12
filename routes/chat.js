const express = require("express");
const router = express.Router();
const Chat = require("../models/chatSchema");

router.post("/api/publishChat", async (req, res) => {
  let { title, sender, chat } = req.body;
  let newChat = new Chat({
    title: title,
    sender: sender,
    chat: chat,
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
  let id = req.body.id;
  Chat.findById(id, async (err, chat) => {
    if (err) {
      console.log(err);
    } else if (!chat) {
      res.status(400).json("Chat Not Found");
    } else {
      res.status(200).json(chat);
    }
  });
});

module.exports = router;
