import "@/dist/main.css";

import { useRouter } from "next/router";

import Navbar from "@/layouts/navbar";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const showNavbar = ![
    "/login",
    "/register",
    "/coming-soon",
    "/_error",
    "/dashboard",
  ].includes(router.pathname);
  return (
    <>
        {showNavbar && <Navbar />}
        <Component {...pageProps} />
    </>
  );
};

export default App;
