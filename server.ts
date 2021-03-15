// Import packages
import { Server, Socket } from "socket.io";

import { Users } from "./models";
import "./config";

// Set up Server
const io = new Server(2323, { cors: { origin: "http://localhost:3000" } });

// Socket
io.on("connection", (socket: Socket) => {
  console.log(`✅ Client ${socket.id} has connected!`);

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`🚫 Client ${socket.id} has disconnected`);
  });

  // Recieve
  socket.on("test message", async (data: []) => {
    console.log("📩 Message from client", data);

    // Send back message to client
    socket.emit("test message", await Users.find({}));
  });

  // Send
  socket.on("send message", async (msg: string) => {
    console.log("📩 Message from client", msg);

    socket.emit("test message", msg);
  });
});
