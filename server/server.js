import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import app from "./app.js";
import { connectDB } from "./config/connectDB.js";

const port = process.env.PORT || 8000;

// Server start
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log("Server is listening...");
  });
};

startServer();
