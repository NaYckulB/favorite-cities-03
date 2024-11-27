import { SessionProvider } from "next-auth/react";  // Import SessionProvider
import "../styles/globals.css";  // Import your global styles
import Navbar from "@/components/Navbar";  // Your Navbar component

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}> {/* Keep SessionProvider for NextAuth */}
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
