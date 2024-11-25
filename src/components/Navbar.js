import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession(); // Check if the user is logged in

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div>
        <Link href="/" className="mr-4 hover:underline">
          Home
        </Link>
        <Link href="/favorites" className="mr-4 hover:underline">
          Favorites
        </Link>
      </div>
      <div>
        {!session ? (
          <>
            <Link href="/login" className="mr-4 hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => signOut({ callbackUrl: "/" })} // Redirect to home after sign out
              className="mr-4 hover:underline bg-red-600 text-white py-1 px-3 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
