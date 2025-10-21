import type { GraphQLError } from "graphql";

// Define the error type based on Apollo Client's error structure
export interface ApolloErrorType {
  message: string;
  graphQLErrors?: ReadonlyArray<GraphQLError>;
  networkError?: Error | null;
  extraInfo?: any;
}

export interface GraphQLErrorDetails {
  message: string;
  code?: string;
  statusCode?: number;
}

/**
 * Extract meaningful error details from Apollo errors
 */
export function handleApolloError(error: ApolloErrorType): GraphQLErrorDetails {
  // Network error
  if (error.networkError) {
    return {
      message: "Network error. Please check your connection.",
      code: "NETWORK_ERROR",
      statusCode: 500,
    };
  }

  // GraphQL errors
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const firstError = error.graphQLErrors[0];
    return {
      message: firstError.message,
      code: firstError.extensions?.code as string,
      statusCode: firstError.extensions?.statusCode as number,
    };
  }

  // Generic error
  return {
    message: error.message || "An unexpected error occurred",
    code: "UNKNOWN_ERROR",
  };
}

/**
 * Check if error is authentication related
 */
export function isAuthError(error: ApolloErrorType): boolean {
  if (error.graphQLErrors) {
    return error.graphQLErrors.some(
      (err) => err.extensions?.code === "UNAUTHENTICATED" || 
               err.extensions?.code === "UNAUTHORIZED"
    );
  }
  return false;
}

/**
 * Check if error is a validation error
 */
export function isValidationError(error: ApolloErrorType): boolean {
  if (error.graphQLErrors) {
    return error.graphQLErrors.some(
      (err) => err.extensions?.code === "BAD_USER_INPUT" ||
               err.extensions?.code === "VALIDATION_ERROR"
    );
  }
  return false;
}

/**
 * Format error for user display
 */
export function formatErrorMessage(error: ApolloErrorType): string {
  const details = handleApolloError(error);
  
  // User-friendly messages based on error codes
  switch (details.code) {
    case "UNAUTHENTICATED":
      return "Please log in to continue.";
    case "UNAUTHORIZED":
      return "You don't have permission to perform this action.";
    case "NOT_FOUND":
      return "The requested resource was not found.";
    case "NETWORK_ERROR":
      return "Unable to connect to the server. Please try again.";
    case "VALIDATION_ERROR":
    case "BAD_USER_INPUT":
      return details.message;
    default:
      return details.message || "Something went wrong. Please try again.";
  }
}
