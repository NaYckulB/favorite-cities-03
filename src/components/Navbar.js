import Link from "next/link";

const Navbar = () => {
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
        <Link href="/login" className="mr-4 hover:underline">
          Login
        </Link>
        <Link href="/register" className="hover:underline">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
