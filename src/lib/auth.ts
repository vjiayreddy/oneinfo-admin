import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { LOGIN_ADMIN, LoginAdminResponse, LoginAdminVariables } from "@/graphql/mutations/auth";

export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    // GitHub OAuth Provider
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),

    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // Credentials Provider (Email/Password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // Create Apollo Client for server-side authentication
          const client = new ApolloClient({
            link: new HttpLink({
              uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
            }),
            cache: new InMemoryCache(),
          });

          // Execute login mutation
          const { data } = await client.mutate<LoginAdminResponse, LoginAdminVariables>({
            mutation: LOGIN_ADMIN,
            variables: {
              input: {
                email: credentials.email,
                password: credentials.password,
              },
            },
          });

          if (data?.loginAdmin) {
            const { adminData, authToken } = data.loginAdmin;

            // Return user object with token
            return {
              id: adminData._id,
              email: adminData.email,
              name: adminData.email.split("@")[0], // Use email prefix as name
              image: null,
              isActive: adminData.isActive,
              authToken: authToken,
            };
          }

          return null;
        } catch (error: any) {
          console.error("Authentication error:", error);
          throw new Error(error.message || "Invalid credentials");
        }
      },
    }),
  ],

  // Custom pages (optional)
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  },

  // Callbacks
  callbacks: {
    // Called when JWT is created or updated
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and user info to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      if (user) {
        token.id = user.id;
        token.email = user.email || undefined;
        // Store the authToken from GraphQL response
        if ((user as any).authToken) {
          token.authToken = (user as any).authToken;
        }
        if ((user as any).isActive !== undefined) {
          token.isActive = (user as any).isActive;
        }
      }
      return token;
    },

    // Called whenever a session is checked
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.accessToken = token.accessToken as string;
        session.authToken = token.authToken as string;
        session.provider = token.provider as string;
        session.isActive = token.isActive as boolean;
      }
      return session;
    },

    // Called when user is redirected to a callback URL
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  // Session configuration
  session: {
    strategy: "jwt", // Use JWT for sessions
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // JWT configuration
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  // Enable debug messages in development
  debug: process.env.NODE_ENV === "development",
};
