import mongoose from "mongoose";

export const connectDB=async()=>{
  try {
    await mongoose.connect(process.env.DB_URI,{
      dbName:"blogdb"
    });
    console.log("Connected to DB!");
  } catch (error) {
    console.log("Connection failed!");
    console.error("Error details:", error.message);
  }
}