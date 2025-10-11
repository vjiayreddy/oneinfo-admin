"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Link from "next/link";
import RightPanel from "@/components/login/RightPanel";
import EmailForm from "@/components/login/EmailForm";
import OtpForm from "@/components/login/OtpForm";
import NewPasswordForm from "@/components/login/NewPasswordForm";

interface ResetPasswordFormData {
  email: string;
}

interface NewPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function AccountResetPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [timer, setTimer] = useState(30); // 30 seconds
  const [canResend, setCanResend] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      email: "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    getValues,
  } = useForm<NewPasswordFormData>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("OTP verified:", otp.join(""));
      setIsOtpVerified(true);
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleNewPasswordSubmit = async (data: NewPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Password reset successfully:", data);
      alert("Password reset successfully! Redirecting to login...");
      // Redirect to login
      window.location.href = "/login";
    } catch (error) {
      console.error("Password reset failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    setIsLoading(true);
    try {
      // Simulate API call to resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Code resent");
      setOtp(["", "", "", "", "", ""]);
      setTimer(30); // Reset timer
      setCanResend(false);
      alert("Verification code sent!");
    } catch (error) {
      console.error("Failed to resend code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Timer effect
  useEffect(() => {
    if (isSuccess && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSuccess, timer]);

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call to send reset link
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Reset link sent to:", data.email);
      setUserEmail(data.email);
      setIsSuccess(true);
      setTimer(30); // Reset timer to 30 seconds
      setCanResend(false);
    } catch (error) {
      console.error("Failed to send reset link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Reset Password Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          {/* Logo & Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">O</span>
              </div>
            </div>
            {!isSuccess && !isOtpVerified ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Reset your password
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-600 px-4 sm:px-0">
                  Enter your email address and we will send you a verification code
                </p>
              </>
            ) : isSuccess && !isOtpVerified ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Enter verification code
                </h2>
                <div className="mt-3 space-y-1">
                  <p className="text-sm sm:text-base text-gray-600">
                    We have sent a code to
                  </p>
                  <p className="text-sm sm:text-base font-medium text-gray-900">
                    {userEmail}
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Set new password
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-600 px-4 sm:px-0">
                  Create a strong password for your account
                </p>
              </>
            )}
          </div>

          {isSuccess && !isOtpVerified && (
            <OtpForm
              otp={otp}
              timer={timer}
              canResend={canResend}
              isVerifying={isVerifying}
              isLoading={isLoading}
              formatTime={formatTime}
              handleOtpChange={handleOtpChange}
              handleOtpKeyDown={handleOtpKeyDown}
              handleVerifyOtp={handleVerifyOtp}
              handleResendCode={handleResendCode}
            />
          )}

          {isOtpVerified && (
            <NewPasswordForm
              showNewPassword={showNewPassword}
              showConfirmPassword={showConfirmPassword}
              isLoading={isLoading}
              register={registerPassword}
              errors={passwordErrors}
              setShowNewPassword={setShowNewPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              handleNewPasswordSubmit={handleSubmitPassword(handleNewPasswordSubmit)}
              getValues={getValues}
            />
          )}

          {!isSuccess && (
            <EmailForm
              onSubmit={handleSubmit(onSubmit)}
              register={register}
              errors={errors}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>

      {/* Right Side - Image/Illustration */}
      <RightPanel />
    </div>
  );
}
