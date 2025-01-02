const { Server } = require("socket.io");

class SocketService {
  constructor() {
    this.io = null;
  }

  // Initialize the Socket.IO server
  init(server) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    // Handle client connections
    this.io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      // Example: Register an event listener
      this.registerEvent(socket, "message", this.handleMessage);

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });
  }

  // Safely get the initialized Socket.IO instance
  getInstance() {
    if (!this.io) {
      throw new Error("Socket.IO is not initialized!");
    }
    return this.io;
  }

  // Function to send a message to a specific socket or broadcast
  sendMessage(event, payload, socket = null) {
    if (socket) {
      socket.emit(event, payload); // Send to a specific socket
    } else {
      this.io.emit(event, payload); // Broadcast to all clients
    }
    console.log(`[SocketService] Event "${event}" sent:`, payload);
  }

  // Function to register an event listener
  registerEvent(socket, event, handler) {
    socket.on(event, (data) => {
      console.log(`[SocketService] Event "${event}" received:`, data);
      handler(socket, data); // Call the handler with the socket and data
    });
  }

  // Example handler for a "message" event
  handleMessage(socket, data) {
    console.log("Processing received message:", data);

    // Example: Send a response back to the client
    this.sendMessage(
      "message:ack",
      { status: "success", received: data },
      socket
    );
  }
}

module.exports = new SocketService();
