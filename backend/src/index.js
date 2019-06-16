const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(
  "mongodb+srv://carlosnobrega:carlos123@cluster0-xtozk.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

const PORT = 3333 || process.env.PORT;

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));

server.listen(PORT, err => {
  if (err) {
    console.log(err);
  }

  console.log("Server is running");
});
