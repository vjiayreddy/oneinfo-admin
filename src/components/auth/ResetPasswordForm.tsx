"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ResetPassword from "./ResetPassword";

/**
 * Example usage of the ResetPassword component
 * 
 * This component demonstrates how to integrate the ResetPassword component
 * after OTP verification is successful.
 */
export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);

    try {
      // Call your password reset API
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          // You might need to pass the token or email here
          // token: searchParams.get("token"),
        }),
      });

      if (response.ok) {
        // Password changed successfully
        alert("Password changed successfully! Please login with your new password.");
        // Redirect to login page
        router.push("/login");
      } else {
        const error = await response.json();
        console.error("Password reset failed:", error);
        alert(error.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return <ResetPassword onSubmit={handleResetPassword} isLoading={isLoading} />;
}
