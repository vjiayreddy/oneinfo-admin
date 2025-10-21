"use client";

import { useSession } from "next-auth/react";
import { Sidebar, Header } from "@/components/new-dashboard";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  // Extract user data from session
  const userEmail = session?.user?.email || "Guest";
  const userName = session?.user?.name || userEmail.split("@")[0] || "Guest";
  const userRole = session?.isActive ? "Admin" : "User";

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Display logged-in user's email */}
        <Header 
          userName={userEmail}
          userRole={userRole}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#fafafa]">
          {status === "loading" ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-[#6e6e73]">Loading...</p>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
