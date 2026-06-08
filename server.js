require("dotenv").config();

const express = require('express');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middleware/error.middleware');
const connectDB = require('./config/db')
const taskRoutes = require('./routes/task.routes')
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
connectDB();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});