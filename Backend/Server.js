import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express(); // Create an Express app
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) to allow requests from specific origins
const server = http.createServer(app); // Create an HTTP server using the Express app

// Initialize a new Socket.io server attached to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "https://peppy-cobbler-174f4a.netlify.app/", // The URL of the front-end
    methods: ["GET", "POST"], // HTTP methods allowed for the communication
  },
});

let users = {}; // Initialize an object `users` to keep track of connected users

// Event listener for a new socket connection
io.on("connection", (socket) => {
  console.log(`new user connected : ${socket.id}`);

  // Listen for a "new-user" event when a new user connects
  socket.on("new-user", (userName) => {
    users[userName] = socket.id;
    io.emit("user-list", Object.keys(users)); // Send the list of usernames (keys of `users` object) to all clients
  });

  // Listen for a "send-chat-message" event, which contains a chat message data
  socket.on("send-chat-message", (data) => {
    const receivedUser = users[data.to]; // Find the socket ID of the user who is supposed to receive the message

    // If the recievedUser is found, send the chat message to the receiver
    if (receivedUser) {
      console.log(`Message sent to ${data.to} (Socket ID: ${receivedUser})`);
      io.to(receivedUser).emit("chat-message", {
        userName: data.userName, // Sender's name
        newMessage: data.newMessage, //message content
        to: data.to, // receiver username
      });
    }
    // Send the chat message to the sender
    io.to(socket.id).emit("chat-message", {
      userName: data.userName,
      newMessage: data.newMessage,
      to: data.to,
    });
  });

  // Listen for a "logout" event, which is triggered when a user logs out
  socket.on("logout", () => {
    const user = Object.keys(users).find((key) => users[key] === socket.id); // Find the username associated with the socket that is logging out
    if (user) {
      delete users[user]; // Remove the user from the `users` object
      io.emit("user-list", Object.keys(users)); // Broadcast the updated list of connected users to all clients
    }
    socket.disconnect(true); // Disconnect the socket
    console.log("User disconnected: ", socket.id);
  });

  // Event listener for when the socket disconnects
  socket.on("disconnect", () => {
    const user = Object.keys(users).find((key) => users[key] === socket.id); // Find the user associated with the socket ID that is disconnecting
    if (user) {
      delete users[user]; // Remove the user from the `users` object
      io.emit("user-list", Object.keys(users)); // Broadcast the updated list of connected users to all clients
    }
    console.log("User disconnected: ", socket.id);
  });
});

// Start the HTTP server and listen on port 3000
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
