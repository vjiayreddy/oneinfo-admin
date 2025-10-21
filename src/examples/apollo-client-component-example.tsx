"use client";

// Example: Using Apollo Client in Client Components
// This is a CLIENT COMPONENT (has "use client" directive)

import { useSuspenseQuery, useMutation } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { Suspense } from "react";

// Define your GraphQL query
const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

// Define your GraphQL mutation
const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// Main component wrapped with Suspense
export default function ClientComponentExample() {
  return (
    <Suspense fallback={<div>Loading users...</div>}>
      <UsersList />
    </Suspense>
  );
}

// Component that uses useSuspenseQuery
function UsersList() {
  // Use useSuspenseQuery hook (recommended for Next.js App Router)
  const { data } = useSuspenseQuery(GET_USERS_QUERY);

  // Use mutation hook
  const [createUser, { loading: creating }] = useMutation(CREATE_USER_MUTATION, {
    // Refetch the query after mutation
    refetchQueries: [{ query: GET_USERS_QUERY }],
  });

  const handleCreateUser = async () => {
    try {
      await createUser({
        variables: {
          name: "New User",
          email: "newuser@example.com",
        },
      });
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h1>Users (Client Component)</h1>
      
      <button
        onClick={handleCreateUser}
        disabled={creating}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {creating ? "Creating..." : "Create New User"}
      </button>

      <ul>
        {data.users.map((user: any) => (
          <li key={user.id} className="mb-2">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
