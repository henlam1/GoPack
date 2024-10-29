import express from "express";
import cors from "cors";
import packingListRouter from "./routes/packingList.js";
import categoryListRouter from "./routes/categoryList.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/packingList", packingListRouter);
app.use("/categoryList", categoryListRouter);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});