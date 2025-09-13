"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Loginpage() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          {/* Animated Logo/Icon */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-primary/40 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          
          {/* Loading Text */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Loading</h2>
            <p className="text-muted-foreground text-sm">Please wait while we prepare your dashboard...</p>
          </div>
          
          {/* Animated Dots */}
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    );
  }
  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
      const result = await signIn("credentials", { 
        email, 
        password,
        redirect: false 
      });
      
      if (result?.error) {
        setError(true);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md transition-all duration-200 p-3 rounded-lg font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Signing In...
              </>
            ) : (
              "Login"
            )}
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
            onClick={() => {
              setIsGoogleLoading(true);
              signIn("google");
            }}
            disabled={isGoogleLoading || isLoading}
            className="flex items-center justify-center gap-3 border rounded-lg p-3 hover:bg-muted transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin"></div>
                <span className="font-medium text-foreground">Connecting...</span>
              </>
            ) : (
              <>
                <FcGoogle className="text-xl" />
                <span className="font-medium text-foreground">Login with Google</span>
              </>
            )}
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
