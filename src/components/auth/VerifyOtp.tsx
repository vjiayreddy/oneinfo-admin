"use client";

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { Clock } from "lucide-react";

interface VerifyOtpProps {
  email: string;
  onSubmit: (otp: string) => void | Promise<void>;
  onEditEmail?: () => void;
  onResendOtp?: () => void | Promise<void>;
  isLoading?: boolean;
  otpLength?: number;
  resendTimer?: number; // in seconds
}

export default function VerifyOtp({
  email,
  onSubmit,
  onEditEmail,
  onResendOtp,
  isLoading = false,
  otpLength = 6,
  resendTimer = 60,
}: VerifyOtpProps) {
  const [otp, setOtp] = useState<string[]>(new Array(otpLength).fill(""));
  const [timeLeft, setTimeLeft] = useState(resendTimer);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && !isLoading) {
      onSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, otpLength);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < otpLength) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    // Focus on the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[otpLength - 1]?.focus();
    }

    // Auto-submit if all fields are filled
    if (newOtp.every((digit) => digit !== "") && !isLoading) {
      onSubmit(newOtp.join(""));
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || isLoading) return;
    
    setCanResend(false);
    setTimeLeft(resendTimer);
    setOtp(new Array(otpLength).fill(""));
    inputRefs.current[0]?.focus();
    
    if (onResendOtp) {
      await onResendOtp();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="bg-white relative w-full h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute left-[30%] top-[514px] w-[502px] h-[148px] opacity-40">
        <div className="absolute inset-0 rounded-full bg-[#e8ddff] blur-3xl"></div>
      </div>

      <div className="absolute left-[-257px] top-[528px] w-[537px] h-[537px] opacity-30">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 blur-3xl"></div>
      </div>

      <div className="absolute left-[-103px] top-[682px] w-[230px] h-[230px] opacity-40">
        <div className="absolute inset-0 rounded-full bg-[#e8ddff] blur-2xl"></div>
      </div>

      <div className="absolute right-[-100px] top-[-233px] w-[542px] h-[542px] opacity-30">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 blur-3xl"></div>
      </div>

      <div className="absolute right-[-50px] top-[-86px] w-[247px] h-[247px] opacity-40">
        <div className="absolute inset-0 rounded-full bg-[#e8ddff] blur-2xl"></div>
      </div>

      {/* Main Card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[606px] px-4">
        <div className="bg-white border border-[#eaeaea] rounded-2xl p-9 shadow-sm">
          <div className="flex flex-col gap-6">
            {/* Logo and Title Section */}
            <div className="flex flex-col items-center gap-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 bg-[#683fbe] rounded">
                  <svg
                    width="26"
                    height="20"
                    viewBox="0 0 26 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13 0L0 10L13 20L26 10L13 0Z" fill="white" />
                  </svg>
                </div>
                <p className="text-[24px] font-normal text-[#683fbe] whitespace-nowrap">
                  Oneinfo.ai
                </p>
              </div>

              {/* Title */}
              <div className="flex flex-col items-center gap-5">
                <p className="text-2xl font-medium text-[#1c1c1e] text-center">
                  Enter the OTP sent to your Email ID
                </p>
              </div>

              {/* Form Section */}
              <div className="flex flex-col gap-9 w-full max-w-[532px] overflow-hidden">
                {/* Email and Timer Section */}
                <div className="flex flex-col gap-5">
                  {/* Email Display with Edit Link */}
                  <div className="flex items-center justify-between text-base">
                    <p className="text-[#6e6e73] font-normal">{email}</p>
                    {onEditEmail && (
                      <button
                        type="button"
                        onClick={onEditEmail}
                        disabled={isLoading}
                        className="text-[#683fbe] font-normal hover:text-[#5632a1] transition-colors disabled:opacity-50"
                      >
                        Edit Email ID
                      </button>
                    )}
                  </div>

                  {/* Timer and Resend OTP */}
                  <div className="flex items-center gap-3">
                    <Clock className="w-[18px] h-[18px] text-[#683fbe]" />
                    <p className="text-base font-normal text-[#683fbe]">
                      {timeLeft}s
                    </p>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={!canResend || isLoading}
                      className={`text-base font-normal transition-colors ${
                        canResend && !isLoading
                          ? "text-[#683fbe] hover:text-[#5632a1] cursor-pointer"
                          : "text-[#6e6e73] opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>

                {/* OTP Input Fields */}
                <div className="flex gap-[9px] w-full min-w-0">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      disabled={isLoading}
                      className="flex-1 min-w-0 h-[43px] bg-white border border-[#eaeaea] rounded text-center text-xl font-medium text-[#1c1c1e] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-[#683fbe] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                {/* Verify Button */}
                <button
                  type="button"
                  onClick={() => onSubmit(otp.join(""))}
                  disabled={isLoading || !isOtpComplete}
                  className={`w-full px-12 py-4 rounded-[32px] text-xs font-semibold transition-all ${
                    isLoading || !isOtpComplete
                      ? "bg-[#e8ddff] text-[#333333] opacity-50 cursor-not-allowed"
                      : "bg-[#683fbe] text-white hover:bg-[#5632a1] active:scale-[0.98]"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    "Verify OTP"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
