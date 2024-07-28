import React, { useState, useEffect, useContext } from "react";
import styles from "./_dashboard.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import useTitle from "@/hooks/useTitle";
import Licence from "@/components/licence";
import { base_url } from "@/api/url";
import { GoHomeFill } from "react-icons/go";
import { HiAcademicCap } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { LoginContext } from "@/context/LoginContext";

const Index = () => {
  useTitle("نگین | پنل کاربری 💄");

  const { token, setToken } = useContext(LoginContext);

  const [userData, setUserData] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [titles, setTitles] = useState([]);
  const [toggleComponent, setToggleComponent] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showLicenses, setShowLicenses] = useState(false);

  useEffect(() => {
    const retriveToken = localStorage.getItem("token")?.replace(/"/g, "");
    setToken(retriveToken);
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  useEffect(() => {
    const push_user = () => {
      router.push("/login");
    };

    if (localStorage.getItem("token") === null) {
      toast.warning(
        <div className="toast-container">
          <span className="toast-message"> لطفا وارد حساب خود شوید! </span>
          <Link href="/login" className="toast-link">
            👈 صفحه ورود
          </Link>
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          onClose: push_user,
        }
      );
      setLoading(false);
    }
  }, [token, router]);

  useEffect(() => {
    if (token) {
      const fetchDetails = async () => {
        try {
          const request = await axios.get(`${base_url}/getUser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await request.data;
          setUserData(data);
        } catch (error) {
          if (error.response?.status === 401) {
            toast.warning(
              <div className="toast-container">
                <span className="toast-message">
                  {" "}
                  لطفا وارد حساب خود شوید!{" "}
                </span>
                <Link href="/login" className="toast-link">
                  👈 صفحه ورود
                </Link>
              </div>,
              {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              }
            );
            setLoading(false);
          }
        }
      };
      fetchDetails();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const request = await axios.get(`${base_url}/user-products/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await request.data;

      if (data.length) {
        const licensesArray = data.map(
          (product) => product.infoLicense.license_key
        );
        const titlesArray = data.map((product) => product.product.title);
        setLicenses(licensesArray);
        setTitles(titlesArray);
        setToggleComponent(true);
        setShowLicenses(true);
      } else {
        setLicenses([]);
        setTitles([]);
        setToggleComponent(true);
        setShowLicenses(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const copyLicense = (licenseKey) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(licenseKey).then(
        function () {
          alert("کد لایسنس با موفقیت کپی شد");
        },
        function () {
          alert("لایسنس کپی نشد دستی اقدام کنید ");
        }
      );
    } else {
      unsecuredCopyToClipboard(licenseKey);
    }
  };

  const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      alert("کد لایسنس با موفقیت کپی شد");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
      alert("لایسنس کپی نشد دستی اقدام کنید ");
    }
    document.body.removeChild(textArea);
  };

  if (loading === false) {
    return (
      <div className={styles.wrapper}>
        <ToastContainer rtl />
        <h1> موردی برای نمایش موجود نیست! </h1>
      </div>
    );
  }

  if (token) {
    return (
      <>
        <div className={styles.container}>
          <ToastContainer rtl />
          <div className={styles.sidePanel}>
            <div className={styles.info}>
              <span> {userData.name} </span>
              <span className={styles.phone}> {userData.phone} </span>
            </div>
            <ul>
              <li onClick={() => setToggleComponent(false)}>
                <GoHomeFill fontSize={22} /> حساب کاربری
              </li>
              <li onClick={fetchUserData}>
                <HiAcademicCap fontSize={22} />
                دوره های من
              </li>
              <li className={styles.logout} onClick={logout}>
                <IoIosLogOut fontSize={22} fill="#ff0000" /> خروج
              </li>
            </ul>
          </div>
          <div className={styles.mainContent}>
            {toggleComponent ? (
              <>
                {showLicenses ? (
                  licenses.map((licenseKey, index) => (
                    <Licence
                      key={licenseKey}
                      licence={licenseKey}
                      title={titles[index]}
                      handleCopy={() => copyLicense(licenseKey)}
                    />
                  ))
                ) : (
                  <>
                    <h3> هنوز دوره ای خریداری نکرده اید 😔</h3>
                    <Link href="/courses" className={styles.link}>
                      خرید دوره جدید
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <h1>سلام {userData.name} عزیز ❤️</h1>
                <p>
                  در قسمت <span onClick={fetchUserData}>دوره های من</span>{" "}
                  میتوانید تمام دوره هایی که شرکت کردید و نحوه دسترسی به آن را
                  ببنید.
                </p>
              </>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.wrapper}>
          <ToastContainer rtl toastClassName={styles.toast} />
          <h1> در حال بارگذاری اطلاعات... </h1>
        </div>
      </>
    );
  }
};

export default Index;
