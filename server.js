require("dotenv").config();

const express = require('express');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middleware/error.middleware');
const connectDB = require('./config/db')
const taskRoutes = require('./routes/task.routes')
const cors = require('cors');

const app = express();

app.use(cors());
connectDB();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler)

app.listen(process.env.PORT, () =>{
    console.log("Server runneing");
    
})

//finsihed testing... now registration and JWT