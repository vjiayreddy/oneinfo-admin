# Apollo Client Quick Reference 🚀

## 📁 Project Structure

```
src/
├── lib/
│   ├── apollo-client.ts          # Server Components client
│   ├── apollo-wrapper.tsx         # Client Components provider
│   └── apollo-error-handler.ts   # Error handling utilities
├── graphql/
│   ├── queries.ts                # GraphQL queries
│   ├── mutations.ts              # GraphQL mutations
│   └── types.ts                  # TypeScript types
├── hooks/
│   └── useApolloMutation.ts      # Custom mutation hook
└── examples/
    ├── apollo-server-component-example.tsx
    ├── apollo-client-component-example.tsx
    └── UsersPage.tsx             # Complete example
```

---

## ⚡ Quick Start

### 1. Environment Setup

Create `.env.local`:
```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://your-api.com/graphql
```

### 2. Server Component (Recommended)

```tsx
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

export default async function Page() {
  const { data } = await getClient().query({
    query: gql`query { users { id name } }`
  });
  
  return <div>{/* render data */}</div>;
}
```

### 3. Client Component

```tsx
"use client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_USERS } from "@/graphql/queries";

export default function Page() {
  const { data } = useSuspenseQuery(GET_USERS);
  return <div>{/* render data */}</div>;
}
```

---

## 🔄 Common Patterns

### Fetch Data (Server)
```tsx
const { data, error } = await getClient().query({ query: GET_USERS });
```

### Fetch Data (Client)
```tsx
const { data } = useSuspenseQuery(GET_USERS);
```

### Mutation (Client)
```tsx
const [createUser] = useMutation(CREATE_USER);
await createUser({ variables: { name, email } });
```

### Refetch After Mutation
```tsx
const { refetch } = useSuspenseQuery(GET_USERS);
const [createUser] = useMutation(CREATE_USER, {
  onCompleted: () => refetch()
});
```

### Error Handling
```tsx
import { formatErrorMessage } from "@/lib/apollo-error-handler";

try {
  await mutate();
} catch (error) {
  const message = formatErrorMessage(error);
  alert(message);
}
```

---

## 📝 Cheat Sheet

| Task | Server Component | Client Component |
|------|-----------------|------------------|
| **Import Client** | `getClient()` | Hooks from `@apollo/experimental-nextjs-app-support/ssr` |
| **Query** | `await client.query()` | `useSuspenseQuery()` or `useQuery()` |
| **Mutation** | `await client.mutate()` | `useMutation()` |
| **Async** | ✅ Direct async/await | ❌ Use hooks |
| **Hooks** | ❌ Not allowed | ✅ Allowed |
| **"use client"** | ❌ No | ✅ Required |

---

## 🎯 When to Use What?

### Use Server Components when:
- ✅ Fetching data for initial render
- ✅ SEO is important
- ✅ No user interaction needed
- ✅ Want faster page loads

### Use Client Components when:
- ✅ Need user interactions (forms, buttons)
- ✅ Need React hooks (useState, useEffect)
- ✅ Real-time updates
- ✅ Browser APIs required

---

## 🔧 Useful Hooks

```tsx
// Query with suspense (recommended)
const { data } = useSuspenseQuery(QUERY);

// Standard query
const { data, loading, error } = useQuery(QUERY);

// Mutation
const [mutate, { loading, error }] = useMutation(MUTATION);

// Lazy query (on-demand)
const [fetchData, { data }] = useLazyQuery(QUERY);

// Custom hook
const { mutate, loading, errorMessage } = useApolloMutation(MUTATION);
```

---

## 🚨 Common Issues

### 1. "Cannot use hooks in Server Components"
**Solution:** Add `"use client"` at the top of file

### 2. "Cache is not defined"
**Solution:** Wrap with `<Suspense>` when using `useSuspenseQuery`

### 3. "Network error"
**Solution:** Check `NEXT_PUBLIC_GRAPHQL_ENDPOINT` in `.env.local`

### 4. "Headers already sent"
**Solution:** Use Server Actions for mutations in Server Components

---

## 📚 File Imports

```tsx
// Server Components
import { getClient } from "@/lib/apollo-client";

// Client Components
import { useSuspenseQuery, useMutation } from "@apollo/experimental-nextjs-app-support/ssr";

// Queries/Mutations
import { GET_USERS, CREATE_USER } from "@/graphql/queries";

// Types
import type { User } from "@/graphql/types";

// Utilities
import { formatErrorMessage } from "@/lib/apollo-error-handler";
import { useApolloMutation } from "@/hooks/useApolloMutation";
```

---

## 🎨 Example Queries

```graphql
# Simple query
query GetUsers {
  users {
    id
    name
    email
  }
}

# Query with variables
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
  }
}

# Mutation
mutation CreateUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id
    name
    email
  }
}
```

---

## 💡 Pro Tips

1. **Always wrap `useSuspenseQuery` with `<Suspense>`**
2. **Use Server Components by default**
3. **Create reusable query files in `src/graphql/`**
4. **Add proper TypeScript types**
5. **Handle errors gracefully**
6. **Use custom hooks for complex mutations**
7. **Leverage `refetchQueries` for cache updates**

---

## 🔗 Resources

- [Full Setup Guide](./APOLLO_CLIENT_SETUP.md)
- [Example Code](./src/examples/)
- [Apollo Docs](https://www.apollographql.com/docs/react/)

---

**Happy coding! 🎉**
