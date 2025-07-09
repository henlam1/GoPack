import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
let connection;

beforeAll(async () => {
  connection = await mongoose.connect(process.env.ATLAS_TEST_URI || "");
});

afterAll(async () => {
  await mongoose.connection.close();
});
