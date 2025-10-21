"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { useMemo } from "react";

// Apollo Wrapper component to wrap your app with Next.js App Router support
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://your-graphql-api.com/graphql",
      // Optional: Add headers if needed
      // headers: {
      //   authorization: `Bearer ${token}`,
      // },
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: httpLink,
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
