interface OtpFormProps {
  otp: string[];
  timer: number;
  canResend: boolean;
  isVerifying: boolean;
  isLoading: boolean;
  formatTime: (seconds: number) => string;
  handleOtpChange: (index: number, value: string) => void;
  handleOtpKeyDown: (index: number, e: React.KeyboardEvent) => void;
  handleVerifyOtp: (e: React.FormEvent) => void;
  handleResendCode: () => void;
}

const OtpForm = ({
  otp,
  timer,
  canResend,
  isVerifying,
  isLoading,
  formatTime,
  handleOtpChange,
  handleOtpKeyDown,
  handleVerifyOtp,
  handleResendCode,
}: OtpFormProps) => {
  return (
    <>
      {/* OTP Input Form */}
      <form onSubmit={handleVerifyOtp} className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
        <div>
          {/* OTP Input Fields */}
          <div className="flex gap-2 sm:gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="0"
              />
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="text-center">
          {timer > 0 ? (
            <p className="text-sm text-gray-600">
              Code expires in{" "}
              <span className="font-semibold text-gray-900">
                {formatTime(timer)}
              </span>
            </p>
          ) : (
            <p className="text-sm text-red-600 font-medium">
              Code expired. Please request a new one.
            </p>
          )}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={isVerifying || otp.some((digit) => !digit)}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isVerifying ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            </>
          ) : (
            "Verify"
          )}
        </button>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-600">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={!canResend || isLoading}
              className="font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {canResend ? "Resend" : "Resend (wait for timer)"}
            </button>
          </p>
        </div>
      </form>
    </>
  );
};

export default OtpForm;
