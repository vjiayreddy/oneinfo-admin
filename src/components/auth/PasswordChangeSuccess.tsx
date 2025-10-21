"use client";

import { CheckCircle2, X } from "lucide-react";

interface PasswordChangeSuccessProps {
  onGoToDashboard: () => void;
  onClose?: () => void;
}

export default function PasswordChangeSuccess({
  onGoToDashboard,
  onClose,
}: PasswordChangeSuccessProps) {
  return (
    <div className="bg-white relative w-full h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute left-[35%] top-[468px] w-[410px] h-[121px] opacity-40">
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

      {/* Success Card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[453px] px-4">
        <div className="bg-white border border-[#eaeaea] rounded-2xl relative shadow-sm">
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          <div className="flex flex-col items-center justify-center gap-8 px-9 py-12">
            {/* Success Icon */}
            <div className="relative w-[86px] h-[86px] flex items-center justify-center">
              <CheckCircle2 
                className="w-full h-full text-[#683fbe]" 
                strokeWidth={1.5}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6 items-center justify-center">
              {/* Success Message */}
              <p className="text-[18.5px] font-medium text-[#1c1c1e] text-center leading-[1.4] tracking-[0.0444px]">
                Your password has been changed
              </p>

              {/* Go to Dashboard Button */}
              <button
                onClick={onGoToDashboard}
                className="border border-[#683fbe] px-4 py-2 rounded-full text-[#683fbe] font-medium text-[17px] leading-[1.5] hover:bg-[#683fbe] hover:text-white transition-all active:scale-[0.98] w-[185px]"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
