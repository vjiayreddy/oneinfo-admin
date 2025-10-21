"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  userRole?: string;
}

export default function Header({
  userName = "Rahul Kumar",
  userAvatar,
  userRole = "Admin",
}: HeaderProps) {
  return (
    <header className="h-[72px] bg-white border-b border-[#eaeaea] px-6 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-[480px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6e6e73]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-[40px] pl-10 pr-4 bg-[#f8f8f8] border border-[#eaeaea] rounded-lg text-sm text-[#1c1c1e] placeholder:text-[#6e6e73] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-[#683fbe]"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-[#6e6e73]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#e66464] rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-[#eaeaea]">
          <div className="text-right">
            <p className="text-sm font-medium text-[#1c1c1e] leading-5">
              {userName}
            </p>
            <p className="text-xs text-[#6e6e73] leading-4">{userRole}</p>
          </div>

          {userAvatar ? (
            <Image
              src={userAvatar}
              alt={userName}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-[#e8ddff] rounded-full flex items-center justify-center">
              <span className="text-[#683fbe] font-medium text-sm">
                {userName.charAt(0)}
              </span>
            </div>
          )}

          <ChevronDown className="w-4 h-4 text-[#6e6e73]" />
        </div>
      </div>
    </header>
  );
}
