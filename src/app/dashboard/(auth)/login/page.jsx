"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Loginpage() {
  const [error, setError] = useState(false);
  const router = useRouter();
  const session = useSession();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn("credentials", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-background">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 p-8 border rounded-2xl shadow-lg bg-card"
        >
          <h1 className="text-3xl font-bold text-center text-foreground">
            Login
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-muted-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-muted-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              Invalid email or password
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md transition-all duration-200 p-3 rounded-lg font-medium cursor-pointer"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <hr className="flex-grow border-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <hr className="flex-grow border-border" />
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={() => signIn("google")}
            className="flex items-center justify-center gap-3 border rounded-lg p-3 hover:bg-muted transition-all duration-200 cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            <span className="font-medium text-foreground">Login with Google</span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-sm text-center text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            href="/dashboard/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
