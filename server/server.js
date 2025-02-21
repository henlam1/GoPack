import express from "express";
import "dotenv/config"
import connectDB from "./config/db.js";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errors/errorHandler.js";

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);
app.use(errorHandler);

// start the Express server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});