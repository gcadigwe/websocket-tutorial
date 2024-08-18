const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

// Event listener for when a client connects to the server
io.on("connection", (socket) => {
  console.log("A new client connected!");

  // Join a room based on client-provided room name
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Client joined room: ${room}`);

    // Send a welcome message to the specific room
    socket.to(room).emit("message", {
      message: `Welcome to room ${room}! You will receive real-time data updates.`,
    });
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`Client left room: ${room}`);
  });

  // Event listener for when the connection is closed
  socket.on("disconnect", () => {
    console.log("A client disconnected.");
  });

  // Event listener for handling errors
  socket.on("error", (error) => {
    console.error("Socket.IO error:", error);
  });
});

// Function to send real-time data updates to a specific room
function sendRealTimeDataToRoom(room) {
  if (room == "room1") {
    const data = {
      timestamp: new Date().toISOString(),
    };
    io.to(room).emit("realTimeData", data);
  } else if (room == "room2") {
    const data = {
      value: Math.random(),
    };
    io.to(room).emit("realTimeData", data);
  }
}

//Send real-time data to different rooms every second
setInterval(() => {
  sendRealTimeDataToRoom("room1");
  sendRealTimeDataToRoom("room2");
}, 1000);

http.listen(8000, () => console.log("listening on http://localhost:8000"));
