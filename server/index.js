const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`USER with ID: ${socket.id} joined room ${data}`);
  });
  socket.on("send_message", (data) => {
    console.log(data);
  });
  io.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3006, () => {
  console.log("Listenin in port 3006");
});
