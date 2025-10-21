# Apollo Client Setup Guide

## 📦 Installation

Apollo Client has been successfully installed with the following packages:

```bash
npm install @apollo/client@latest @apollo/experimental-nextjs-app-support graphql
```

## 🔧 Configuration

### Files Created:

1. **`src/lib/apollo-client.ts`** - Server-side Apollo Client for Server Components
2. **`src/lib/apollo-wrapper.tsx`** - Apollo Provider wrapper for Client Components
3. **`src/app/layout.tsx`** - Updated with ApolloWrapper

---

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://your-graphql-api.com/graphql
```

**Important:** Replace the URL with your actual GraphQL API endpoint.

---

## 📖 Usage

### 1️⃣ Server Components (Recommended for SSR)

Server Components can use `async/await` directly and don't need hooks:

```tsx
// app/users/page.tsx
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

export default async function UsersPage() {
  const client = getClient();
  const { data } = await client.query({ query: GET_USERS });

  return (
    <div>
      {data.users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

**Benefits:**
- ✅ Better SEO
- ✅ Faster initial page load
- ✅ No hydration needed
- ✅ Simpler code (no hooks)

---

### 2️⃣ Client Components (For Interactive Features)

Client Components use hooks and the `"use client"` directive:

```tsx
"use client";

import { useSuspenseQuery, useMutation } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { Suspense } from "react";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

function UsersList() {
  const { data } = useSuspenseQuery(GET_USERS);
  
  return (
    <div>
      {data.users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsersList />
    </Suspense>
  );
}
```

**Use Client Components when you need:**
- ✅ User interactions (buttons, forms)
- ✅ Real-time updates
- ✅ React hooks (useState, useEffect, etc.)
- ✅ Browser APIs

---

## 🔄 Mutations

### In Server Actions (Recommended)

```tsx
"use server";

import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { revalidatePath } from "next/cache";

export async function createUser(name: string, email: string) {
  const client = getClient();
  
  const { data } = await client.mutate({
    mutation: gql`
      mutation CreateUser($name: String!, $email: String!) {
        createUser(name: $name, email: $email) {
          id
          name
        }
      }
    `,
    variables: { name, email },
  });
  
  revalidatePath("/users");
  return data;
}
```

### In Client Components

```tsx
"use client";

import { useMutation } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
    }
  }
`;

export function CreateUserForm() {
  const [createUser, { loading }] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({
      variables: { name: "John", email: "john@example.com" },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}
```

---

## 🎯 Best Practices

### 1. **Use Server Components by default**
- Fetch data on the server when possible
- Better performance and SEO

### 2. **Use Client Components only when needed**
- Interactive features
- Form submissions
- Real-time updates

### 3. **Organize your queries**

```typescript
// src/graphql/queries.ts
import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;
```

### 4. **Error Handling**

```tsx
const { data, error } = await client.query({ query: GET_USERS });

if (error) {
  return <div>Error: {error.message}</div>;
}
```

### 5. **Loading States**

```tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DataComponent />
    </Suspense>
  );
}
```

---

## 📚 Available Hooks (Client Components Only)

- `useSuspenseQuery` - Recommended for Next.js App Router
- `useQuery` - Standard query hook
- `useMutation` - For mutations
- `useSubscription` - For real-time subscriptions
- `useLazyQuery` - Query on demand

---

## 🔗 Resources

- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [Next.js 13 Integration](https://www.apollographql.com/blog/how-to-use-apollo-client-with-next-js-13)
- [Official Package](https://github.com/apollographql/apollo-client-nextjs)

---

## 📝 Example Files

Check these example files for reference:
- `src/examples/apollo-server-component-example.tsx`
- `src/examples/apollo-client-component-example.tsx`

---

## 🚀 Next Steps

1. Set up your GraphQL endpoint in `.env.local`
2. Create your GraphQL queries in `src/graphql/`
3. Start fetching data in your components
4. Enjoy type-safe GraphQL with TypeScript!

---

## ⚠️ Important Notes

- **Server Components**: Use `getClient()` directly
- **Client Components**: Use hooks like `useSuspenseQuery`
- **Always wrap with Suspense** when using `useSuspenseQuery`
- **GraphQL endpoint** must be accessible from both server and client

---

Happy coding with Apollo Client! 🎉
