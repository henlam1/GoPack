import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import apiRouter from "./routes/api.js";
import categoryListRouter from "./routes/categoryList.js";
import categoryTypeRouter from "./routes/categoryType.js";
import itemListDefaultsRouter from "./routes/itemListDefaults.js";
import itemsRouter from "./routes/items.js";
import packingListRouter from "./routes/packingList.js";

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRouter);
app.use("/categoryList", categoryListRouter);
app.use("/categoryType", categoryTypeRouter);
app.use("/itemListDefaults", itemListDefaultsRouter);
app.use("/items", itemsRouter);
app.use("/packingList", packingListRouter);


// start the Express server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});