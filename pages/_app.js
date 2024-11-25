import { SessionProvider } from "next-auth/react";  // Import SessionProvider
import "../styles/globals.css";
import Navbar from "@/components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    // Wrap your app with SessionProvider to provide session context
    <SessionProvider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
