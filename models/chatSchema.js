const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  sender: {
    type: String,
    require: true,
  },
  like: {
    type: Number,
    require: true,
  },
  chat: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  likes: [
    {
      type: String,
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
