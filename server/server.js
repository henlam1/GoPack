import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errors/errorHandler.js";

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"], // Can be an array
    credentials: true, // Critical for cookies
    methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", routes);
app.use(errorHandler);

// start the Express server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
