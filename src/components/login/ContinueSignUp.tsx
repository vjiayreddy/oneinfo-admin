import Link from "next/link";

const ContinueSignup = () => {
  return (
    <p className="text-center text-sm text-gray-600">
      Don't have an account?{" "}
      <Link
        href="/signup"
        className="font-medium text-blue-600 hover:text-blue-700"
      >
        Sign up
      </Link>
    </p>
  );
};
export default ContinueSignup;