require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./config/dbConnect");

// ! required route file
const adminRoute = require("./Routes/adminRoute");
const generalRoute = require("./Routes/generalRoute");

app.use(express.json());

// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors({ origin: "*" }));

// ! porting the routes
app.use(cors());
app.use(cookieParser());

app.use("/api/admin", adminRoute);
app.use("/api/general", generalRoute);

const server = app.listen(3001, () => {
  console.log("Server Started ...");
});

const io = require("socket.io")(server, {
  // the amount of time to wait if till 60 sec no msg is send then it will close the connnection
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io ..");

  // set up a connection between frontend and bcknd
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData);

    socket.emit("connected");
  });
  // create a room where the selected user can join
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joinde room : " + room);
  });

  // socket for is typing
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // send new message socket
  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat) return console.log("chat does not have any users");

    // logic to send message to all users except the sender
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
