# Auth Components

This directory contains authentication-related components for the Oneinfo Admin Dashboard.

## Components

### Login.tsx

A fully functional login component built from the Figma design with the following features:

#### Features
- ✅ **Email & Password Fields** with validation
- ✅ **Show/Hide Password** toggle
- ✅ **Form Validation** using react-hook-form
- ✅ **Loading States** with disabled inputs during submission
- ✅ **Error Messages** for invalid inputs
- ✅ **Decorative Background** elements matching the Figma design
- ✅ **Responsive Design** with Tailwind CSS
- ✅ **TypeScript Support** with proper type definitions

#### Design Tokens
The component uses the following color scheme from the Figma design:
- **Primary Purple**: `#683fbe` - Main brand color for buttons and text
- **Light Purple**: `#e8ddff` - Backgrounds and decorative elements
- **Header Color**: `#1c1c1e` - Main headings
- **Placeholder Color**: `#a0a0a0` - Input placeholders
- **Stroke Color**: `#eaeaea` - Borders and separators
- **White**: `#ffffff` - Backgrounds

#### Props

```typescript
interface LoginProps {
  onSubmit: (data: { email: string; password: string }) => void | Promise<void>;
  isLoading?: boolean;
  onForgotPassword?: () => void;
}
```

- **onSubmit**: Callback function when the form is submitted with valid data
- **isLoading**: Optional boolean to show loading state
- **onForgotPassword**: Optional callback for the "Forgot Password" link

#### Usage

```tsx
import Login from "@/components/auth/Login";

export default function LoginPage() {
  const handleLogin = async (data: { email: string; password: string }) => {
    // Your login logic here
    console.log("Login data:", data);
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    router.push("/forgot-password");
  };

  return (
    <Login
      onSubmit={handleLogin}
      isLoading={false}
      onForgotPassword={handleForgotPassword}
    />
  );
}
```

#### Integration with next-auth

```tsx
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Login failed: " + result?.error);
    }
  };

  return <Login onSubmit={handleLogin} />;
}
```

#### Validation Rules

**Email:**
- Required field
- Must be a valid email format

**Password:**
- Required field
- Minimum 6 characters

#### Styling

The component uses Tailwind CSS and follows the existing project patterns. All colors and spacing are based on the Figma design specifications.

---

### ForgotPassword.tsx

A password reset component that allows users to request an OTP via email.

#### Features
- ✅ **Email Field** with validation and label
- ✅ **Form Validation** using react-hook-form
- ✅ **Loading States** with disabled inputs during submission
- ✅ **Error Messages** for invalid inputs
- ✅ **Decorative Background** matching the Figma design
- ✅ **Back to Login** optional link
- ✅ **TypeScript Support** with proper type definitions

#### Design Tokens
Uses the same color scheme as the Login component:
- **Primary Purple**: `#683fbe`
- **Light Purple**: `#e8ddff`
- **Header Color**: `#1c1c1e`
- **Sub Text Color**: `#6e6e73`
- **Placeholder Color**: `#a0a0a0`
- **Stroke Color**: `#eaeaea`

#### Props

```typescript
interface ForgotPasswordProps {
  onSubmit: (data: { email: string }) => void | Promise<void>;
  isLoading?: boolean;
  onBackToLogin?: () => void;
}
```

- **onSubmit**: Callback function when the form is submitted with valid email
- **isLoading**: Optional boolean to show loading state
- **onBackToLogin**: Optional callback for the "Back to Login" link

#### Usage

```tsx
import { ForgotPassword } from "@/components/auth";

export default function ForgotPasswordPage() {
  const handleForgotPassword = async (data: { email: string }) => {
    // Send OTP to user's email
    await sendOTP(data.email);
  };

  return (
    <ForgotPassword
      onSubmit={handleForgotPassword}
      isLoading={false}
      onBackToLogin={() => router.push("/login")}
    />
  );
}
```

#### Validation Rules

**Email:**
- Required field
- Must be a valid email format

---

### VerifyOtp.tsx

An OTP verification component with timer and resend functionality.

#### Features
- ✅ **6-Digit OTP Input** with auto-focus and auto-advance
- ✅ **Paste Support** - Paste OTP from clipboard
- ✅ **Countdown Timer** with configurable duration
- ✅ **Resend OTP** functionality with timer
- ✅ **Edit Email** option to go back
- ✅ **Auto-Submit** when all digits are entered
- ✅ **Keyboard Navigation** - Backspace to previous field
- ✅ **Loading States** with disabled inputs
- ✅ **Decorative Background** matching the Figma design
- ✅ **TypeScript Support** with proper type definitions

#### Design Tokens
Uses the same color scheme as other auth components:
- **Primary Purple**: `#683fbe`
- **Light Purple**: `#e8ddff`
- **Header Color**: `#1c1c1e`
- **Sub Text Color**: `#6e6e73`
- **Body Color**: `#333333`
- **Stroke Color**: `#eaeaea`

#### Props

```typescript
interface VerifyOtpProps {
  email: string;
  onSubmit: (otp: string) => void | Promise<void>;
  onEditEmail?: () => void;
  onResendOtp?: () => void | Promise<void>;
  isLoading?: boolean;
  otpLength?: number; // default: 6
  resendTimer?: number; // in seconds, default: 60
}
```

- **email**: The email address where OTP was sent (displayed to user)
- **onSubmit**: Callback function when OTP is complete and submitted
- **onEditEmail**: Optional callback for "Edit Email ID" link
- **onResendOtp**: Optional callback to resend OTP
- **isLoading**: Optional boolean to show loading state
- **otpLength**: Number of OTP digits (default: 6)
- **resendTimer**: Countdown time in seconds before allowing resend (default: 60)

#### Usage

```tsx
import { VerifyOtp } from "@/components/auth";

export default function VerifyOtpPage() {
  const handleVerifyOtp = async (otp: string) => {
    // Verify OTP
    await verifyOTP(email, otp);
  };

  const handleResendOtp = async () => {
    // Resend OTP
    await resendOTP(email);
  };

  return (
    <VerifyOtp
      email="user@example.com"
      onSubmit={handleVerifyOtp}
      onEditEmail={() => router.push("/forgot-password")}
      onResendOtp={handleResendOtp}
      isLoading={false}
      otpLength={6}
      resendTimer={60}
    />
  );
}
```

#### Features Explained

**Auto-Focus & Navigation:**
- First input is auto-focused on mount
- Automatically moves to next input when a digit is entered
- Backspace moves to previous input when current is empty

**Paste Support:**
- Users can paste a 6-digit OTP code
- Component validates and distributes digits automatically

**Timer & Resend:**
- Countdown timer shows remaining time
- "Resend OTP" button is disabled until timer reaches 0
- Timer resets when OTP is resent

**Auto-Submit:**
- Form automatically submits when all 6 digits are entered
- No need to click "Verify OTP" button

---

### ResetPassword.tsx

A password reset component for changing/creating a new password after OTP verification.

#### Features
- ✅ **Two Password Fields** - New password and confirm password
- ✅ **Show/Hide Password** toggles for both fields
- ✅ **Strong Password Validation** - 8+ chars, uppercase, lowercase, number
- ✅ **Password Match Validation** - Ensures both passwords match
- ✅ **Form Validation** using react-hook-form
- ✅ **Loading States** with disabled inputs
- ✅ **Error Messages** for validation failures
- ✅ **Decorative Background** matching the Figma design
- ✅ **TypeScript Support** with proper type definitions

#### Design Tokens
Uses the same color scheme as other auth components:
- **Primary Purple**: `#683fbe`
- **Light Purple**: `#e8ddff`
- **Header Color**: `#1c1c1e`
- **Sub Text Color**: `#6e6e73`
- **Placeholder Color**: `#a0a0a0`
- **Stroke Color**: `#eaeaea`

#### Props

```typescript
interface ResetPasswordProps {
  onSubmit: (data: { password: string; confirmPassword: string }) => void | Promise<void>;
  isLoading?: boolean;
}
```

- **onSubmit**: Callback function when the form is submitted with valid passwords
- **isLoading**: Optional boolean to show loading state

#### Usage

```tsx
import { ResetPassword } from "@/components/auth";

export default function ResetPasswordPage() {
  const handleResetPassword = async (data: { password: string; confirmPassword: string }) => {
    // Update password
    await updatePassword(data.password);
    router.push("/login");
  };

  return (
    <ResetPassword
      onSubmit={handleResetPassword}
      isLoading={false}
    />
  );
}
```

#### Validation Rules

**Password:**
- Required field
- Minimum 8 characters
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter
- Must contain at least one number

**Confirm Password:**
- Required field
- Must match the password field

---

### PasswordChangeSuccess.tsx

A success confirmation screen shown after the password has been successfully changed.

#### Features
- ✅ **Success Icon** - Large checkmark icon
- ✅ **Confirmation Message** - "Your password has been changed"
- ✅ **Go to Dashboard Button** - Primary action
- ✅ **Close Button** - Optional X button in top-right
- ✅ **Decorative Background** matching the design
- ✅ **TypeScript Support** with proper type definitions

#### Design Tokens
- **Primary Purple**: `#683fbe`
- **Light Purple**: `#e8ddff`
- **Header Color**: `#1c1c1e`
- **Stroke Color**: `#eaeaea`

#### Props

```typescript
interface PasswordChangeSuccessProps {
  onGoToDashboard: () => void;
  onClose?: () => void;
}
```

- **onGoToDashboard**: Callback when "Go to Dashboard" button is clicked
- **onClose**: Optional callback for the close (X) button

#### Usage

```tsx
import { PasswordChangeSuccess } from "@/components/auth";

export default function SuccessPage() {
  return (
    <PasswordChangeSuccess
      onGoToDashboard={() => router.push("/dashboard")}
      onClose={() => router.push("/login")}
    />
  );
}
```

---

## Complete Password Reset Flow

The `ForgotPasswordForm` component demonstrates the complete 4-step password reset flow:

### Step 1: Enter Email (`ForgotPassword`)
- User enters their email address
- System sends OTP to the email

### Step 2: Verify OTP (`VerifyOtp`)
- User enters 6-digit OTP
- System verifies the OTP
- Timer with resend functionality

### Step 3: Change Password (`ResetPassword`)
- User creates a new password
- Password must meet security requirements
- Must confirm the new password

### Step 4: Success Confirmation (`PasswordChangeSuccess`)
- Shows success message
- Redirects to dashboard or login

### Flow Example

```tsx
import { ForgotPasswordForm } from "@/components/auth";

// This single component handles all 4 steps automatically
export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
```

The component automatically transitions between steps and maintains state throughout the flow.

---

## Other Components

### LoginButton.tsx
A simple button component for triggering login/logout with next-auth.

### UserProfile.tsx
Displays user profile information from the current session.

### LoginForm.tsx
Example implementation showing how to use the Login component with various authentication strategies.

### ForgotPasswordForm.tsx
Example implementation showing how to use the ForgotPassword component with OTP functionality.

### VerifyOtpForm.tsx
Example implementation showing how to use the VerifyOtp component with email verification flow.

### ResetPasswordForm.tsx
Example implementation showing how to use the ResetPassword component after OTP verification.
