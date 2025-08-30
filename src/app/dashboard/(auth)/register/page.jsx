"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [err, setError] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    console.log(name, email, password);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) setError(true);
      console.log("res", res);
      res.status === 201 &&
        router.push("/dashboard/login?success=Account has been created");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-background">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 p-8 border rounded-2xl shadow-lg bg-card"
        >
          <h1 className="text-3xl font-bold text-center text-foreground">
            Create an Account
          </h1>

          {/* name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-sm font-medium text-muted-foreground"
            >
              name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

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

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md transition-all duration-200 p-3 rounded-lg font-medium cursor-pointer"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/dashboard/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
