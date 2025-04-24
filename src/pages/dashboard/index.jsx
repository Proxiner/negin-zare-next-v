import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from "./_dashboard.module.scss";
import Link from "next/link";
import Licence from "@/components/licence";
import { base_url } from "@/api/url";
import { HiAcademicCap } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { LoginContext } from "@/context/LoginContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const fetchUser = async (token) => {
  const res = await axios.get(`${base_url}/getUser`, {
    headers: { Authorization: `Bearer ${token}` },
    validateStatus: (status) => status < 500,
  });
  if (res.status === 404) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return res.data;
};

const fetchPurchases = async (token) => {
  const res = await axios.get(`${base_url}/user-products/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const Dashboard = () => {
  const { token, setToken } = useContext(LoginContext);
  const router = useRouter();

  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (!token) {
      toast.error("لطفاً ابتدا وارد شوید");
      const timer = setTimeout(() => {
        router.replace("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [token, router]);

  const { data: userInformations, isLoading: userLoading } = useQuery({
    queryKey: ["user", token],
    queryFn: () => fetchUser(token),
    enabled: Boolean(token),
    retry: false,
    onError: (err) => {
      if (err.status === 404) {
        router.replace("/login");
      } else {
        toast.error("خطا در بارگذاری اطلاعات کاربر");
      }
    },
  });

  const {
    data: purchases = [],
    isLoading: purchasesLoading,
    refetch: refetchPurchases,
  } = useQuery({
    queryKey: ["purchases", token],
    queryFn: () => fetchPurchases(token),
    enabled: false,
    onError: () => toast.error("خطا در دریافت دوره‌ها"),
  });

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    router.push("/");
  };

  const copyLicense = (licenseKey) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(licenseKey).then(
        () => toast.success("کد لایسنس با موفقیت کپی شد"),
        () => toast.error("لایسنس کپی نشد، لطفاً دستی کپی کنید")
      );
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = licenseKey;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        toast.success("کد لایسنس با موفقیت کپی شد");
      } catch {
        toast.error("لایسنس کپی نشد، لطفاً دستی کپی کنید");
      }
      document.body.removeChild(textArea);
    }
  };

  if (!token) {
    return <ToastContainer rtl />;
  }

  if (userLoading) {
    return (
      <div className={styles.wrapper}>
        <ToastContainer rtl />
        <h1>در حال بارگذاری اطلاعات...</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>نگین | پنل کاربری 💄</title>
      </Head>

      <ToastContainer rtl />

      <div className={styles.sidePanel}>
        <div className={styles.info}>
          <span>{userInformations.name}</span>
          <span className={styles.phone}>{userInformations.phone}</span>
        </div>
        <ul>
          <li onClick={() => refetchPurchases()}>
            <HiAcademicCap fontSize={22} />
            دوره‌های من
          </li>
          <li onClick={logout} className={styles.logout}>
            <IoIosLogOut fontSize={22} fill="#ff0000" /> خروج
          </li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        {purchasesLoading ? (
          <h3>در حال بارگذاری دوره‌ها...</h3>
        ) : purchases.length > 0 ? (
          purchases.map((product) => (
            <Licence
              key={product.infoLicense.license_key}
              licence={product.infoLicense.license_key}
              title={product.product.title}
              handleCopy={() => copyLicense(product.infoLicense.license_key)}
            />
          ))
        ) : (
          <>
            <h3>هنوز دوره‌ای خریداری نکرده‌اید 😔</h3>
            <Link href="/courses" className={styles.link}>
              خرید دوره جدید
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
