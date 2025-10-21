# Authentication Setup Guide

This guide explains how the GraphQL-based authentication with NextAuth is implemented in the OneInfo Admin Dashboard.

## 🎯 Overview

The authentication system uses:
- **NextAuth.js** for session management
- **GraphQL** for backend authentication (`LoginAdmin` mutation)
- **JWT** tokens for secure session storage
- **Apollo Client** for GraphQL communication

---

## 📁 File Structure

```
src/
├── app/
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts          # NextAuth API handler
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx            # Login form with NextAuth integration
│   ├── providers/
│   │   └── SessionProvider.tsx      # Session provider wrapper
│   └── shared/
│       └── LayoutClient.tsx         # Layout with user session display
├── graphql/
│   └── mutations/
│       └── auth.ts                  # GraphQL login mutation
├── lib/
│   ├── auth.ts                      # NextAuth configuration
│   └── session-provider.tsx         # Existing session provider
└── types/
    └── next-auth.d.ts               # TypeScript type extensions
```

---

## 🔧 Setup Instructions

### 1. Environment Variables

Add these variables to your `.env` or `.env.local` file:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# GraphQL API Endpoint
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://your-backend-url/graphql
```

**Generate a secure secret:**
```bash
openssl rand -base64 32
```

### 2. GraphQL Mutation

The login mutation is defined in `src/graphql/mutations/auth.ts`:

```graphql
mutation LoginAdmin($input: LoginAdminInput) {
  loginAdmin(input: $input) {
    adminData {
      _id
      createdAt
      email
      isActive
      updatedAt
    }
    authToken
  }
}
```

**Input:**
```json
{
  "input": {
    "email": "admin@example.com",
    "password": "YourPassword123"
  }
}
```

### 3. Authentication Flow

```
┌─────────────┐
│  User Login │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  LoginForm.tsx      │
│  signIn() called    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────────────┐
│  /api/auth/[...nextauth]    │
│  NextAuth Handler           │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  lib/auth.ts                │
│  CredentialsProvider        │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Apollo Client              │
│  Execute LoginAdmin         │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  GraphQL Backend            │
│  Validate & Return Token    │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  JWT Token Created          │
│  Session Established        │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Redirect to Dashboard      │
│  User Email in Header       │
└─────────────────────────────┘
```

---

## 💻 Code Examples

### Using Authentication in Components

#### Get Current User Session

```tsx
"use client";

import { useSession } from "next-auth/react";

export default function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <p>Email: {session?.user?.email}</p>
      <p>User ID: {session?.user?.id}</p>
      <p>Auth Token: {session?.authToken}</p>
      <p>Active: {session?.isActive ? "Yes" : "No"}</p>
    </div>
  );
}
```

#### Sign In

```tsx
import { signIn } from "next-auth/react";

const handleLogin = async (email: string, password: string) => {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    console.error("Login failed:", result.error);
  } else if (result?.ok) {
    // Redirect to dashboard
    router.push("/dashboard");
  }
};
```

#### Sign Out

```tsx
import { signOut } from "next-auth/react";

const handleLogout = () => {
  signOut({ callbackUrl: "/auth/signin" });
};
```

#### Protect Server Components

```tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome, {session.user.email}</p>
    </div>
  );
}
```

---

## 🔒 Session Data Structure

The session object contains:

```typescript
{
  user: {
    id: string;              // Admin _id from GraphQL
    email: string;           // Admin email
    name: string;            // Derived from email
    image: null;             // Optional avatar URL
  },
  authToken: string;         // JWT token from GraphQL
  isActive: boolean;         // Admin active status
  accessToken?: string;      // OAuth access token (if using OAuth)
  provider?: string;         // Auth provider name
}
```

---

## 🛡️ Security Features

### 1. JWT Tokens
- Tokens stored securely in HTTP-only cookies
- 30-day expiration by default
- Auto-refresh on activity

### 2. CSRF Protection
- Built-in CSRF token validation
- Secure cookie settings

### 3. Password Security
- Passwords never stored in session
- Only validated against backend
- GraphQL handles password hashing

### 4. Session Strategy
```typescript
session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 days
}
```

---

## 🚀 API Routes

### NextAuth Endpoints

All authentication endpoints are automatically created:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/signin` | GET/POST | Sign in page/action |
| `/api/auth/signout` | POST | Sign out action |
| `/api/auth/session` | GET | Get current session |
| `/api/auth/csrf` | GET | Get CSRF token |
| `/api/auth/providers` | GET | List auth providers |
| `/api/auth/callback/credentials` | POST | Credentials callback |

---

## 🧪 Testing Authentication

### Test Login Flow

1. **Start your GraphQL backend** (ensure it's running)

2. **Update environment variables**
   ```bash
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
   ```

3. **Test credentials**
   ```
   Email: mrtzsingapurwala@gmail.com
   Password: Murtaza@08
   ```

4. **Navigate to login page**
   ```
   http://localhost:3000/auth/signin
   ```

5. **Check session**
   ```
   http://localhost:3000/api/auth/session
   ```

### Debug Mode

Enable debug logging in `lib/auth.ts`:

```typescript
export const authOptions: NextAuthOptions = {
  // ...
  debug: process.env.NODE_ENV === "development",
};
```

View logs in terminal for authentication flow details.

---

## 🔄 Custom Callbacks

### JWT Callback
Runs when JWT is created/updated:
```typescript
async jwt({ token, user }) {
  if (user) {
    token.authToken = user.authToken;
    token.isActive = user.isActive;
  }
  return token;
}
```

### Session Callback
Runs when session is accessed:
```typescript
async session({ session, token }) {
  session.authToken = token.authToken;
  session.isActive = token.isActive;
  return session;
}
```

### Redirect Callback
Controls post-auth redirects:
```typescript
async redirect({ url, baseUrl }) {
  if (url.startsWith("/")) return `${baseUrl}${url}`;
  return baseUrl;
}
```

---

## 📦 GraphQL Integration

### Apollo Client Configuration

The auth system uses Apollo Client for GraphQL:

```typescript
const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});
```

### Adding Auth Token to GraphQL Requests

To include the auth token in GraphQL requests:

```typescript
import { setContext } from '@apollo/client/link/context';

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  return {
    headers: {
      ...headers,
      authorization: session?.authToken ? `Bearer ${session.authToken}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

---

## 🐛 Troubleshooting

### Issue: "NEXTAUTH_SECRET is not defined"
**Solution:** Add `NEXTAUTH_SECRET` to your `.env` file

### Issue: "Cannot connect to GraphQL endpoint"
**Solution:** 
- Verify `NEXT_PUBLIC_GRAPHQL_ENDPOINT` is correct
- Ensure your GraphQL server is running
- Check for CORS issues

### Issue: "Invalid credentials"
**Solution:**
- Verify email/password are correct
- Check GraphQL mutation response
- View server logs for errors

### Issue: "Session is null after login"
**Solution:**
- Clear browser cookies
- Restart Next.js dev server
- Check JWT callback is returning user data

### Issue: "useSession hook not working"
**Solution:**
- Ensure `SessionProvider` wraps your app in `layout.tsx`
- Component must be client-side (`"use client"`)

---

## 📚 Resources

- [NextAuth.js Documentation](https://next-auth.js.org)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react)
- [Next.js App Router](https://nextjs.org/docs/app)

---

## 🎉 Summary

Your authentication system is now fully configured with:

✅ GraphQL-based login via `LoginAdmin` mutation  
✅ NextAuth session management  
✅ JWT token storage  
✅ User email displayed in header  
✅ Type-safe TypeScript interfaces  
✅ Protected routes support  
✅ OAuth providers ready (GitHub, Google)  

**Next Steps:**
1. Add environment variables
2. Test login flow
3. Implement logout functionality
4. Add protected route middleware
5. Create password reset flow
