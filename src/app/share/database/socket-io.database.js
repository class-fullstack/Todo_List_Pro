const { Server } = require("socket.io");

class SocketService {
  constructor() {
    this.io = null;
  }

  init(server) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });

      // Add your custom event handlers here
    });
  }

  getInstance() {
    if (!this.io) {
      throw new Error("Socket.io not initialized!");
    }
    return this.io;
  }
}

module.exports = new SocketService();
