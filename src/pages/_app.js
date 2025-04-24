"use client";

import "@/dist/main.css";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/layouts/navbar";
import LoginProvider, { LoginContext } from "@/context/LoginContext";
import CartProvider from "@/context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const AppContent = ({ Component, pageProps }) => {
  const router = useRouter();
  const { token, setToken } = useContext(LoginContext);

  // load token from localStorage
  useEffect(() => {
    setToken(localStorage.getItem("token")?.replace(/"/g, ""));
  }, [setToken]);

  const hideOn = [
    "/login",
    "/register",
    "/coming-soon",
    "/_error",
    "/apply",
    "/cart",
    "/cart/checkout",
  ];
  const showNavbar = !hideOn.includes(router.pathname);

  return (
    <>
      {showNavbar && <Navbar hrefRoute={token ? "/dashboard" : "/login"} />}
      <Component {...pageProps} />
    </>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <CartProvider>
          <AppContent Component={Component} pageProps={pageProps} />
        </CartProvider>
      </LoginProvider>
    </QueryClientProvider>
  );
};

export default App;
