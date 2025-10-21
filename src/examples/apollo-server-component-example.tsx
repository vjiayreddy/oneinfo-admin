// Example: Using Apollo Client in Server Components
// This is a SERVER COMPONENT (no "use client" directive)

import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

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

// Server Component - can use async/await directly
export default async function ServerComponentExample() {
  // Get the Apollo Client instance
  const client = getClient();

  // Fetch data using client.query()
  const { data, error } = await client.query({
    query: GET_USERS_QUERY,
  });

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div>
      <h1>Users (Server Component)</h1>
      <ul>
        {data.users.map((user: any) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
