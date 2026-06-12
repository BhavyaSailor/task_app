require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/error.middleware");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/task.routes");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("dev")); // <-- HERE

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});