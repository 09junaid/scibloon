import bcrypt from "bcryptjs";
import { User } from "@/models";
import { connectDB } from "../../../../../utils/db";
import { NextResponse } from "next/server";
export const POST=async(request)=>{
  const {name,email,password}=await request.json();
  await connectDB();
  const hashPassword=await bcrypt.hash(password,10);
  const newUser=new User({
    name,
    email,
    password:hashPassword
  })
  try {
    await newUser.save();
    return new NextResponse("User has been created",{status:201});
  } catch (error) {
    return new NextResponse(error.message,{status:500});
  }
}