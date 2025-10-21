"use client";

import { useMutation } from "@apollo/client/react";
import type { DocumentNode, OperationVariables } from "@apollo/client";
import { useState } from "react";
import { formatErrorMessage } from "@/lib/apollo-error-handler";

/**
 * Options for the Apollo mutation hook
 */
interface UseApolloMutationOptions<TData = any, TVariables = any> {
  onCompleted?: (data: TData) => void;
  onError?: (error: any) => void;
  refetchQueries?: any[];
  [key: string]: any;
}

/**
 * Enhanced mutation hook with error handling and loading states
 */
export function useApolloMutation<TData = any, TVariables extends OperationVariables = any>(
  mutation: DocumentNode,
  options?: UseApolloMutationOptions<TData, TVariables>
) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [mutate, { loading, error, data }] = useMutation<TData, TVariables>(
    mutation,
    {
      ...options,
      onError: (error: any) => {
        setErrorMessage(formatErrorMessage(error));
        options?.onError?.(error);
      },
      onCompleted: (data: TData) => {
        setErrorMessage("");
        options?.onCompleted?.(data);
      },
    }
  );

  const executeMutation = async (variables?: TVariables) => {
    setErrorMessage("");
    try {
      const result = await mutate({ variables } as any);
      return result;
    } catch (err) {
      // Error is already handled by onError
      throw err;
    }
  };

  return {
    mutate: executeMutation,
    loading,
    error,
    errorMessage,
    data,
  };
}
