import { gql } from "@apollo/client";

/**
 * Login Admin Mutation
 * Authenticates an admin user with email and password
 */
export const LOGIN_ADMIN = gql`
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
`;

/**
 * TypeScript types for Login
 */
export interface LoginAdminInput {
  email: string;
  password: string;
}

export interface AdminData {
  _id: string;
  createdAt: string;
  email: string;
  isActive: boolean;
  updatedAt: string;
}

export interface LoginAdminResponse {
  loginAdmin: {
    adminData: AdminData;
    authToken: string;
  };
}

export interface LoginAdminVariables {
  input: LoginAdminInput;
}

/**
 * Send OTP Admin Mutation
 * Sends OTP to admin user for password reset or other actions
 */
export const SEND_OTP_ADMIN = gql`
  mutation SendOtpAdmin($input: SendOtpAdminInput) {
    sendOtpAdmin(input: $input) {
      _id
      createdAt
      email
      isActive
      password
      updatedAt
    }
  }
`;

/**
 * TypeScript types for Send OTP Admin
 */
export interface SendOtpAdminInput {
  action: string;
  email: string;
}

export interface SendOtpAdminResponse {
  sendOtpAdmin: string;
}

export interface SendOtpAdminVariables {
  input: SendOtpAdminInput;
}

/**
 * Verify OTP Admin Mutation
 * Verifies OTP for admin user during password reset or other actions
 */
export const VERIFY_OTP_ADMIN = gql`
  mutation VerifyOtpAdmin($input: VerifyOtpAdminInput) {
    verifyOtpAdmin(input: $input) {
      admin {
        _id
        createdAt
        email
        isActive
        password
        updatedAt
      }
    }
  }
`;

/**
 * TypeScript types for Verify OTP Admin
 */
export interface VerifyOtpAdminInput {
  action: string;
  email: string;
  otp: string;
}

export interface VerifyOtpAdminResponse {
  verifyOtpAdmin: {
    admin: {
      _id: string;
      createdAt: string;
      email: string;
      isActive: boolean;
      password: string;
      updatedAt: string;
    };
  };
}

export interface VerifyOtpAdminVariables {
  input: VerifyOtpAdminInput;
}
