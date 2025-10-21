import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";

// Server-side Apollo Client for Server Components
// Creates a new client instance for each request to avoid cache sharing between users
export function getClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // Replace with your GraphQL API endpoint
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://your-graphql-api.com/graphql",
      // Optional: Add headers if needed
      // headers: {
      //   authorization: `Bearer ${token}`,
      // },
    }),
  });
}
