"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPassword from "./ForgotPassword";
import VerifyOtp from "./VerifyOtp";
import ResetPassword from "./ResetPassword";
import PasswordChangeSuccess from "./PasswordChangeSuccess";
import { useApolloMutation } from "@/hooks/useApolloMutation";
import {
  SEND_OTP_ADMIN,
  SendOtpAdminResponse,
  SendOtpAdminVariables,
  VERIFY_OTP_ADMIN,
  VerifyOtpAdminResponse,
  VerifyOtpAdminVariables,
} from "@/graphql/mutations/auth";

/**
 * Example usage of the ForgotPassword component
 * 
 * This component demonstrates the complete password reset flow:
 * 1. Enter email (ForgotPassword)
 * 2. Verify OTP (VerifyOtp)
 * 3. Change password (ResetPassword)
 * 4. Success confirmation (PasswordChangeSuccess)
 */
export default function ForgotPasswordForm() {
  const [currentStep, setCurrentStep] = useState<"email" | "otp" | "reset" | "success">("email");
  const [email, setEmail] = useState("");
  const [otherLoading, setOtherLoading] = useState(false);
  const router = useRouter();
  
  // Initialize Apollo mutation for sending OTP
  const {
    mutate: sendOtpAdmin,
    loading: isSendingOtp,
    errorMessage,
  } = useApolloMutation<SendOtpAdminResponse, SendOtpAdminVariables>(
    SEND_OTP_ADMIN
  );

  // Initialize Apollo mutation for verifying OTP
  const {
    mutate: verifyOtpAdmin,
    loading: isVerifyingOtp,
    errorMessage: verifyErrorMessage,
  } = useApolloMutation<VerifyOtpAdminResponse, VerifyOtpAdminVariables>(
    VERIFY_OTP_ADMIN
  );

  const handleForgotPassword = async (data: { email: string }) => {
    try {
      // Call Apollo mutation to send OTP
      const result = await sendOtpAdmin({
        input: {
          action: "resetPasswordAdmin",
          email: data.email,
        },
      });

      if (result?.data?.sendOtpAdmin) {
        // Store email and show OTP verification form
        setEmail(data.email);
        setCurrentStep("otp");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(errorMessage || "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      // Call Apollo mutation to verify OTP
      const result = await verifyOtpAdmin({
        input: {
          action: "resetPasswordAdmin",
          email,
          otp,
        },
      });

      if (result?.data?.verifyOtpAdmin) {
        // OTP verified successfully - show reset password form
        setCurrentStep("reset");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert(verifyErrorMessage || "Invalid OTP. Please try again.");
    }
  };

  const handleEditEmail = () => {
    // Go back to forgot password form
    setCurrentStep("email");
  };

  const handleResetPassword = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    setOtherLoading(true);

    try {
      // Call your password reset API
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: data.password,
        }),
      });

      if (response.ok) {
        // Password changed successfully - show success screen
        setCurrentStep("success");
      } else {
        const error = await response.json();
        console.error("Password reset failed:", error);
        alert(error.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setOtherLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Call Apollo mutation to resend OTP
      const result = await sendOtpAdmin({
        input: {
          action: "resetPassword",
          email,
        },
      });

      if (result?.data?.sendOtpAdmin) {
        alert("OTP resent successfully!");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert(errorMessage || "Failed to resend OTP. Please try again.");
    }
  };

  const handleBackToLogin = () => {
    // Navigate back to login page
    router.push("/login");
  };

  // Step 1: Enter Email
  if (currentStep === "email") {
    return (
      <ForgotPassword
        onSubmit={handleForgotPassword}
        isLoading={isSendingOtp}
        onBackToLogin={handleBackToLogin}
      />
    );
  }

  // Step 2: Verify OTP
  if (currentStep === "otp") {
    return (
      <VerifyOtp
        email={email}
        onSubmit={handleVerifyOtp}
        onEditEmail={handleEditEmail}
        onResendOtp={handleResendOtp}
        isLoading={isVerifyingOtp}
        otpLength={6}
        resendTimer={60}
      />
    );
  }

  // Step 3: Reset Password
  if (currentStep === "reset") {
    return (
      <ResetPassword
        onSubmit={handleResetPassword}
        isLoading={otherLoading}
      />
    );
  }

  // Step 4: Success Screen
  return (
    <PasswordChangeSuccess
      onGoToDashboard={() => router.push("/dashboard")}
      onClose={() => router.push("/login")}
    />
  );
}
