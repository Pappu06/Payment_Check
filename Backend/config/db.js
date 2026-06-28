import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("⚠️ MongoDB Connection Error (Server will continue running with local JSON fallback):", error.message);
  }
};

export default connectDB;