const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config({ path: "/config.env" });
URL =
  "mongodb+srv://papyrus123:papyrus123@cluster0.czjsl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(URL);
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/", require("./routes/user"));
app.use("/", require("./routes/oauth"));
// app.use("/",require("./middleware/auth"));
app.use("/", require("./routes/get"));
app.use("/", require("./routes/chat"));
app.use("/", require("./routes/like"));

const PORT =process.env.PORT||3000;

const server = app.listen(PORT, () => {
  console.log(`the app is running on port ${PORT}`);
});
