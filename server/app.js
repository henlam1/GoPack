import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errors/errorHandler.js";

const app = express();

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

export default app;
