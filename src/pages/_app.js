"use client";

import "@/dist/main.css";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Navbar from "@/layouts/navbar";
import LoginProvider from "@/context/LoginContext";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  const [route, setRoute] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRoute(false);
    } else {
      setRoute(true);
    }
  }, [route]);

  const showNavbar = ![
    "/login",
    "/register",
    "/coming-soon",
    "/_error",
    "/dashboard",
    "/apply",
    "/check-out",
    "/purchase/failed",
    "/purchase/success"
  ].includes(router.pathname);
  return (
    <>
      <LoginProvider>
        {showNavbar && <Navbar hrefRoute={route ? "/dashboard" : "/login"} />}
        <Component {...pageProps} />
      </LoginProvider>
    </>
  );
};

export default App;
