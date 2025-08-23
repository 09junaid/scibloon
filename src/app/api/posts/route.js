import { NextResponse } from "next/server"
import { connectDB } from "../../../../utils/db";
import { Post } from "@/models";

export const GET = async (request) => {
  try {
    console.log("Attempting to connect to database...");
    await connectDB();
    console.log("Database connected successfully");
    
    console.log("Fetching posts from database...");
    const posts = await Post.find();
    console.log(`Found ${posts.length} posts:`, posts);
    
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("GET API Error Details:", error);
    return NextResponse.json(
      { error: "Database Error", details: error.message }, 
      { status: 500 }
    );
  }
}

// export const POST = async (request) => {
//   try {
//     console.log("Attempting to connect to database for POST...");
//     await connectDB();
//     console.log("Database connected successfully for POST");
    
//     const body = await request.json();
//     console.log("Received data:", body);
    
//     // Validate required fields
//     const { title, description, img, content, author } = body;
//     if (!title || !description || !img || !content || !author) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }
    
//     console.log("Creating new post...");
//     const newPost = new Post({
//       title,
//       description,
//       img,
//       content,
//       author
//     });
    
//     console.log("Saving post to database...");
//     const savedPost = await newPost.save();
//     console.log("Post saved successfully:", savedPost);
    
//     return NextResponse.json(savedPost, { status: 201 });
//   } catch (error) {
//     console.error("POST API Error Details:", error);
//     return NextResponse.json(
//       { error: "Failed to create post", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// export const PUT = async (request) => {
//   try {
//     console.log("Attempting to connect to database for PUT...");
//     await connectDB();
//     console.log("Database connected successfully for PUT");
    
//     const body = await request.json();
//     console.log("Received update data:", body);
    
//     const { _id, title, description, img, content, author } = body;
    
//     if (!_id) {
//       return NextResponse.json(
//         { error: "Post ID is required" },
//         { status: 400 }
//       );
//     }
    
//     console.log("Updating post with ID:", _id);
//     const updatedPost = await Post.findByIdAndUpdate(
//       _id,
//       { title, description, img, content, author },
//       { new: true, runValidators: true }
//     );
    
//     if (!updatedPost) {
//       return NextResponse.json(
//         { error: "Post not found" },
//         { status: 404 }
//       );
//     }
    
//     console.log("Post updated successfully:", updatedPost);
//     return NextResponse.json(updatedPost, { status: 200 });
//   } catch (error) {
//     console.error("PUT API Error Details:", error);
//     return NextResponse.json(
//       { error: "Failed to update post", details: error.message },
//       { status: 500 }
//     );
//   }
// }