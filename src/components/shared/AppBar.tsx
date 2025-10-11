"use client";

import { useState } from "react";

interface AppBarProps {
  onToggleSidebar: () => void;
}

export default function AppBar({ onToggleSidebar }: AppBarProps) {
  const [notificationCount] = useState(3);
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sm:px-6 sticky top-0 z-50">
      <div className="flex items-center justify-between w-full">
        {/* Left Section: Logo & Hamburger Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Hamburger Menu - Only visible on mobile */}
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base sm:text-lg">O</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold text-gray-900 hidden sm:inline">OneInfo</span>
          </div>
        </div>

        {/* Right Section: Notifications & User */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Notification Icon with Badge */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-4 border-l border-gray-200">
            {/* User info - hidden on small screens */}
            <div className="text-right hidden md:block">
              <div className="text-sm font-medium text-gray-900">Admin User</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
            {/* Avatar */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
              AU
            </div>
            {/* Dropdown Arrow - hidden on mobile */}
            <button className="p-1 hover:bg-gray-100 rounded transition-colors hidden sm:block">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
