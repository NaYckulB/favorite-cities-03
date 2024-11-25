import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';


const LoginPage = () => {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading state
    setStatusMessage(""); // Clear previous messages

    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirection
        username: e.target.username.value,
        password: e.target.password.value,
      });

      setIsLoading(false); // Stop loading state

      if (result && result.ok) {
        // Successful login
        setStatusMessage("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/"); // Redirect to home page after 1 second
        }, 1000);
      } else {
        // Failed login or undefined result
        const errorMessage = result?.error
          ? `Login failed. ${result.error}`
          : "Unexpected error occurred. Please try again.";
        setStatusMessage(errorMessage);
      }
    } catch (error) {
      // Catch unexpected errors
      setIsLoading(false); // Stop loading state
      setStatusMessage("An unexpected error occurred. Please try again.");
      console.error("Login error:", error); // Log the error for debugging
      
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
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
          disabled={isLoading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isLoading}
        />

        {statusMessage && (
          <p
            className={`text-sm ${
              statusMessage.includes("successful")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {statusMessage}
          </p>
        )}
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
        <Link href="/register" className="text-blue-500 hover:underline">
            Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
