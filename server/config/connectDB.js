import mongoose from "mongoose";

export const connectDB = async function () {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};
