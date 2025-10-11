"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import AppBar from "./AppBar";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* AppBar at the top */}
      <AppBar onToggleSidebar={toggleSidebar} />
      
      {/* Main content area with Sidebar and page content */}
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        {/* Content area with left margin for fixed sidebar on desktop */}
        <div className="flex-1 lg:ml-[240px]">
          {children}
        </div>
      </div>
    </div>
  );
}
