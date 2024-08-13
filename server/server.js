const WebSocket = require("ws");

// Create a WebSocket server on port 8000
const wss = new WebSocket.Server({ port: 8000 });

// Event listener for when a client connects to the server
wss.on("connection", (ws) => {
  console.log("A new client connected!");

  // Send a welcome message
  ws.send(
    JSON.stringify({
      message:
        "Welcome to the WebSocket server! You will receive real-time data updates.",
    })
  );

  // Event listener for when the connection is closed
  ws.on("close", () => {
    console.log("A client disconnected.");
  });

  // Event listener for handling errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// Function to send real-time data updates
function sendRealTimeData() {
  const data = {
    timestamp: new Date().toISOString(),
    value: Math.random(), // Simulate a real-time data value
  };

  // Broadcast the data to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Send real-time data every second
setInterval(sendRealTimeData, 1000);

console.log("WebSocket server is running on ws://localhost:8000");
