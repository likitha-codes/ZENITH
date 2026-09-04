import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log("MongoDB URI not configured");
    return;
  }

  await mongoose.connect(uri);

  console.log("MongoDB connected");
}