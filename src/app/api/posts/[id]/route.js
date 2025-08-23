import { NextResponse } from "next/server"
import { connectDB } from "../../../../../utils/db";
import { Post } from "@/models";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    console.log("Database connected successfully for individual post");
    
    const { id } = params;
    if (!id || id.length !== 24) {
      console.log("Invalid post ID format");
      return NextResponse.json(
        { error: "Invalid post ID format" },
        { status: 400 }
      );
    }
    
    const post = await Post.findById(id);
    
    if (!post) {
      console.log("Post not found in database");
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(post, { status: 200 });
    
  } catch (error) {
    console.error("GET Individual Post API Error Details:", error);
    return NextResponse.json(
      { error: "Database Error", details: error.message }, 
      { status: 500 }
    );
  }
}
