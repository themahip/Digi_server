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
  userId:{
    type:String,
    default:"62da9116f601a10b0a891aa9"
  }
});
chatSchema.methods.getLikeUser= async function(id){
  try{
    this.userId=this.userId.concat({id});
    this.save();
  }catch(err){
    console.log(err);
  }

}

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
