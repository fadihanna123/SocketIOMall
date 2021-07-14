import { Socket } from "socket.io";

const disconnect = (socket: Socket): void => {
  console.log(`🚫 Client ${socket.id} has disconnected`);
};

export { disconnect };
