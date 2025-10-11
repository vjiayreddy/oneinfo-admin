const RightPanel = () => {
  return (
    <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 items-center justify-center p-12">
      <div className="max-w-md text-center text-white space-y-6">
        <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold">Verify Your Identity</h2>
        <p className="text-base lg:text-lg text-blue-100">
          Enter your email address and we'll send you a verification code to
          reset your password securely.
        </p>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-left space-y-3">
          <h3 className="font-semibold text-base lg:text-lg">What happens next?</h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Receive OTP code via email
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Enter the verification code
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Set your new password
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
