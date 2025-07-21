import "dotenv/config";
import connectDB from "./config/db.js";
import app from "./app.js"

// Connect to DB
connectDB();

// start the Express server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
