import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const db = mongoose.connection;
    db.on("connected", () => {
      console.log("Mongoose connected to " + process.env.MONGODB_URI);
    });
    db.on("error", (err) => {
      console.log("Mongoose connection error: " + err);
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
