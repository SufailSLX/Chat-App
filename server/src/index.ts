import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: { origin: "*" },
});

// Setup Socket.io
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  socket.on("sendMessage", (message) => {
    socket.broadcast.emit("receiveMessage", message); // Broadcast to all except sender
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Start server after DB connection
connectDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on ${PORT} 🚀`));
});
