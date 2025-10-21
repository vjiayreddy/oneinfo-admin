import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginButton from "@/components/auth/LoginButton";
import UserProfile from "@/components/auth/UserProfile";

export default async function ProtectedPage() {
  // Get session on the server
  const session = await getServerSession(authOptions);

  // Redirect to sign-in if not authenticated
  if (!session) {
    redirect("/auth/signin?callbackUrl=/protected");
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Protected Page</h1>
            <p className="text-gray-600 mt-2">
              This page is only accessible to authenticated users
            </p>
          </div>
          <LoginButton />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile */}
          <div className="lg:col-span-1">
            <UserProfile />
          </div>

          {/* Protected Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-purple-900 mb-2">
                Welcome, {session.user?.name || session.user?.email}! 🎉
              </h2>
              <p className="text-purple-700">
                You have successfully authenticated and can access this protected content.
              </p>
            </div>

            {/* Session Data Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Session Data</h3>
              <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>

            {/* Features Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Protected Features</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Server-Side Authentication</h4>
                    <p className="text-sm text-gray-600">
                      Session is verified on the server before rendering the page
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Automatic Redirects</h4>
                    <p className="text-sm text-gray-600">
                      Unauthenticated users are redirected to sign-in page
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Multiple Auth Providers</h4>
                    <p className="text-sm text-gray-600">
                      Supports GitHub, Google, and Credentials
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <div>
                    <h4 className="font-medium text-gray-900">JWT Sessions</h4>
                    <p className="text-sm text-gray-600">
                      Secure, stateless authentication with JWT tokens
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
