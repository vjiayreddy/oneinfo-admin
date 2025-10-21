"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordProps {
  onSubmit: (data: ResetPasswordFormData) => void | Promise<void>;
  isLoading?: boolean;
}

export default function ResetPassword({
  onSubmit,
  isLoading = false,
}: ResetPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormData>({
    mode: "onChange",
  });

  const password = watch("password");

  return (
    <div className="bg-white relative w-full h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute left-[30%] top-[534px] w-[502px] h-[148px] opacity-40">
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

              {/* Title and Subtitle */}
              <div className="flex flex-col items-center gap-5">
                <p className="text-2xl font-medium text-[#1c1c1e] text-center whitespace-nowrap">
                  Change your password
                </p>
                <div className="px-2 py-2">
                  <p className="text-[15.4px] font-normal text-[#6e6e73] text-center leading-[1.4] tracking-[0.037px]">
                    Enter a new password below to change your password
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5 w-full max-w-[532px]"
              >
                {/* New Password Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-xs font-normal text-[#6e6e73]"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      disabled={isLoading}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message: "Password must contain uppercase, lowercase, and number",
                        },
                      })}
                      className={`w-full h-[43px] px-3 py-2 pr-10 bg-white border rounded text-sm font-medium text-[#1c1c1e] placeholder:text-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#683fbe] transition-colors ${
                        errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#eaeaea]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0a0a0] hover:text-gray-600 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-[18px] h-[18px]" />
                      ) : (
                        <EyeIcon className="w-[18px] h-[18px]" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-xs font-normal text-[#6e6e73]"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter new password"
                      disabled={isLoading}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      className={`w-full h-[43px] px-3 py-2 pr-10 bg-white border rounded text-sm font-medium text-[#1c1c1e] placeholder:text-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#683fbe] transition-colors ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#eaeaea]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0a0a0] hover:text-gray-600 transition-colors"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="w-[18px] h-[18px]" />
                      ) : (
                        <EyeIcon className="w-[18px] h-[18px]" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Change Password Button */}
                <button
                  type="submit"
                  disabled={isLoading || !isValid}
                  className={`w-full px-12 py-4 rounded-[25px] text-xs font-semibold transition-all ${
                    isLoading || !isValid
                      ? "bg-[#e8ddff] text-[#1c1c1e] opacity-50 cursor-not-allowed"
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
                      Changing Password...
                    </span>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
