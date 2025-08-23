import mongoose from "mongoose";

// Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  content:{
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
},{timestamps:true});

// User Schema
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    unique:true,
    required: true,
  },
  email:{
    type: String,
    unique:true,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
},{timestamps:true});

// Export models with proper caching
export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
