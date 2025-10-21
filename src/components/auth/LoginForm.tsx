"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Login from "./Login";

/**
 * LoginForm Component
 * 
 * Integrates the Login component with NextAuth for GraphQL-based authentication.
 * Authenticates users via the LoginAdmin GraphQL mutation.
 */
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError("");
    
    try {
      // Use NextAuth signIn with credentials provider
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Don't redirect automatically
      });

      if (result?.error) {
        // Handle authentication error
        setError(result.error);
        console.error("Login failed:", result.error);
      } else if (result?.ok) {
        // Successful login - redirect to dashboard
        router.push("/dashboard");
        router.refresh(); // Refresh to update session
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    router.push("/auth/forgot-password");
  };

  return (
    <>
      <Login
        onSubmit={handleLogin}
        isLoading={isLoading}
        onForgotPassword={handleForgotPassword}
      />
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </>
  );
}
