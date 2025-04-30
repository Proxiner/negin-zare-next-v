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
import Loading from "@/components/loading";

const fetchUser = async (token) => {
  const res = await axios.get(`${base_url}/getUser`, {
    headers: { Authorization: `Bearer ${token}` },
    validateStatus: (status) => status < 500,
  });

  if (res.status === 401) {
    const error = new Error("User not found");
    error.status = 401;
    throw error;
  }

  return res.data;
};

const fetchUserLicenses = async (token) => {
  const res = await axios.get(`${base_url}/user-products/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.data?.message === "User dose not have product") {
    return []; // No licenses purchased
  }

  return res.data;
};

const Dashboard = () => {
  const { token, setToken } = useContext(LoginContext);
  const router = useRouter();

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

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user", token],
    queryFn: () => fetchUser(token),
    enabled: Boolean(token),
    retry: false,
  });

  const {
    data: licensesPurchased,
    isLoading: isLicensesLoading,
    isError: isLicensesError,
    refetch: refetchPurchases,
  } = useQuery({
    queryKey: ["licenses", token],
    queryFn: () => fetchUserLicenses(token),
    enabled: Boolean(token),
  });

  useEffect(() => {
    if (isError) {
      toast.error("احراز هویت انجام نشد. در حال انتقال به صفحه ورود...", {
        autoClose: 3000,
        onClose: () => router.replace("/login"),
      });
    }
  }, [isError, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className={styles.wrapper}>
        <h1>خطایی رخ داده است</h1>
        <ToastContainer rtl />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ToastContainer rtl />

      <Head>
        <title>نگین | پنل کاربری 💄</title>
      </Head>

      <div className={styles.sidePanel}>
        <div className={styles.info}>
          <span>{user?.name}</span>
          <span className={styles.phone}>{user?.phone}</span>
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
        <h2>سلام {user?.name || "کاربر عزیز"} 👋</h2>

        {licensesPurchased && licensesPurchased.length > 0 ? (
          licensesPurchased.map((item, index) => (
            <Licence
              key={item.infoLicense.license_key || index}
              licence={item.infoLicense.license_key}
              title={item.product.title}
              handleCopy={() => copyLicense(item.infoLicense.license_key)}
            />
          ))
        ) : (
          <h3>هنوز دوره‌ای خریداری نکرده‌اید 😔</h3>
        )}

        <Link href="/courses" className={styles.link}>
          خرید دوره جدید
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
