"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VerifyOtp from "./VerifyOtp";

/**
 * Example usage of the VerifyOtp component
 * 
 * This component demonstrates how to integrate the VerifyOtp component
 * with your authentication system.
 */
export default function VerifyOtpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get email from URL params or use a default
  const email = searchParams.get("email") || "user@example.com";

  const handleVerifyOtp = async (otp: string) => {
    setIsLoading(true);
    
    try {
      // Call your OTP verification API
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        // OTP verified successfully
        alert("OTP verified successfully!");
        // Redirect to password reset page or login
        router.push("/reset-password");
      } else {
        const error = await response.json();
        console.error("OTP verification failed:", error);
        alert(error.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditEmail = () => {
    // Navigate back to forgot password page
    router.push("/forgot-password");
  };

  const handleResendOtp = async () => {
    try {
      // Call your resend OTP API
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("OTP resent successfully!");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("An error occurred while resending OTP.");
    }
  };

  return (
    <VerifyOtp
      email={email}
      onSubmit={handleVerifyOtp}
      onEditEmail={handleEditEmail}
      onResendOtp={handleResendOtp}
      isLoading={isLoading}
      otpLength={6}
      resendTimer={60}
    />
  );
}
