"use client";

import "@/dist/main.css";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Navbar from "@/layouts/navbar";
import LoginProvider from "@/context/LoginContext";
import CartProvider from "@/context/CartContext";

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
    "/apply",
    "/cart",
    "/cart/checkout",
  ].includes(router.pathname);
  return (
    <>
      <LoginProvider>
        <CartProvider>
          {showNavbar && <Navbar hrefRoute={route ? "/dashboard" : "/login"} />}
          <Component {...pageProps} />
        </CartProvider>
      </LoginProvider>
    </>
  );
};

export default App;
