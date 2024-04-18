import "@/dist/main.css";

import { useRouter } from "next/router";

import Navbar from "@/layouts/navbar";
import LoginProvider from "@/context/LoginContext";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const showNavbar = ![
    "/login",
    "/register",
    "/coming-soon",
    "/_error",
    "/dashboard",
    "/apply",
  ].includes(router.pathname);
  return (
    <>
    <LoginProvider>
        {showNavbar && <Navbar />}
        <Component {...pageProps} />
    </LoginProvider>
    </>
  );
};

export default App;
