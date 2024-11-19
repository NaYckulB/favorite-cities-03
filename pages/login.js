import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const { callbackUrl = "/" } = router.query; // Redirect to callbackUrl or home by default
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setError(null); // Reset error

    const result = await signIn("credentials", {
      redirect: false, // Prevent automatic redirect
      username: e.target.username.value,
      password: e.target.password.value,
    });

    setIsLoading(false); // Stop loading

    if (result.error) {
      // Map error codes to friendly messages
      const errorMessage =
        result.error === "CredentialsSignin"
          ? "Invalid username or password."
          : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    } else {
      router.push(callbackUrl); // Redirect to the original page or home
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Login</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 bg-white p-6 shadow-md rounded w-80"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
