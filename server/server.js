import express from "express";
import cors from "cors";
import packingListRouter from "./routes/packingList.js";
import categoryListRouter from "./routes/categoryList.js";
import itemListDefaultsRouter from "./routes/itemListDefaults.js";
import categoryTypeRouter from "./routes/categoryType.js";
import itemsRouter from "./routes/items.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/packingList", packingListRouter);
app.use("/categoryList", categoryListRouter);
app.use("/itemListDefaults", itemListDefaultsRouter);
app.use("/categoryType", categoryTypeRouter);
app.use("/items", itemsRouter);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});