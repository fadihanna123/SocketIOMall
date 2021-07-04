// Import packages
import { Server, Socket } from "socket.io";

import { Users } from "./models";
import "./config";

// Set up Server
const io = new Server(2323, { cors: { origin: "http://localhost:3000" } });

/* Example 2
const users: Record<string, User> = {};
io.on("connection", (socket) => {
  users[socket.id] = {
    id: socket.id,
    joined: new Date(),
  };

  socket.on("set nickname", (nickname) => {
    if (users[socket.id].nickname) {
      return socket.emit("message", {
        type: "danger",
        text: "You already have nickname you!",
      });
    }

    users[socket.id] = {
      ...users[socket.id],
      nickname,
    };

    console.log(users[socket.id]);

    socket.emit("nickname set", users[socket.id]);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    socket.emit("nickname set", users[socket.id]);
  });
});
*/

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
