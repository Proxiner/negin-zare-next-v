"use client";

import "@/dist/main.css";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/layouts/navbar";
import LoginProvider, { LoginContext } from "@/context/LoginContext";
import CartProvider from "@/context/CartContext";

const AppContent = ({ Component, pageProps }) => {
  const router = useRouter();
  const { token, setToken } = useContext(LoginContext);

  const [route, setRoute] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRoute(false);
    } else {
      setRoute(true);
    }
  }, [route]);

  useEffect(() => {
    setToken(localStorage.getItem("token")?.replace(/"/g, ""));
  }, [token]);

  const showNavbar = ![
    "/login",
    "/register",
    "/coming-soon",
    "/_error",
    "/apply",
    "/cart",
    "/cart/checkout",
  ].includes(router.pathname);

  return (
    <>
      {showNavbar && <Navbar hrefRoute={route ? "/dashboard" : "/login"} />}
      <Component {...pageProps} />
    </>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <LoginProvider>
      <CartProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </CartProvider>
    </LoginProvider>
  );
};

export default App;
