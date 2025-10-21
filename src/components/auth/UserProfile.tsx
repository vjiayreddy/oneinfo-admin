"use client";

import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <p className="text-gray-600">Not signed in</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="text-center space-y-4">
        {/* User Image */}
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="w-20 h-20 rounded-full mx-auto border-2 border-purple-200"
          />
        ) : (
          <div className="w-20 h-20 rounded-full mx-auto bg-purple-100 flex items-center justify-center">
            <span className="text-3xl text-purple-600">
              {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
        )}

        {/* User Info */}
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {session.user?.name || "Anonymous User"}
          </h3>
          <p className="text-sm text-gray-600">{session.user?.email}</p>
        </div>

        {/* Additional Info */}
        <div className="pt-4 border-t border-gray-200 space-y-2 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">User ID:</span>
            <span className="font-mono text-gray-900">{session.user?.id}</span>
          </div>
          {session.provider && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Provider:</span>
              <span className="font-medium text-gray-900 capitalize">{session.provider}</span>
            </div>
          )}
          {session.accessToken && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Access Token:</span>
              <span className="font-mono text-xs text-gray-900 truncate max-w-[150px]">
                {session.accessToken.substring(0, 20)}...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
