const http = require("http");
const app = require("./app/app");
const socketService = require("./app/share/database/socket-io.database");

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
socketService.init(server);

// Start server
const PORT = 5001; // or the appropriate port
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
