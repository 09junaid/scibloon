import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "../../../../../utils/db"
import { User } from "@/models"
import bcrypt from "bcryptjs"
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      async authorize(credentials) {
        await connectDB();
        try {
          const user=await User.findOne({email:credentials.email});
          if(!user) throw new Error("No user found with this email, please sign up")
          const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password);
          if(!isPasswordCorrect) throw new Error("Wrong Credentials")
          return user;
        } catch (error) {
          throw new Error("Invalid Credentials",error)
        }
      }
    })

  ],
  pages: {
    error: "/dashboard/login"
  }
})
export { handler as GET, handler as POST }