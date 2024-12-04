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

const Dashboard = () => {
  useTitle("نگین | پنل کاربری 💄");

  const { token } = useContext(LoginContext);

  const [userInformations, setUserInformation] = useState({});
  const [licenses, setLicenses] = useState([]);
  const [titles, setTitles] = useState([]);

  const [showBought, setShowBought] = useState(false);
  const [showLicenses, setShowLicenses] = useState(false);

  const [loading, setLoading] = useState(true);

  const { setToken } = useContext(LoginContext);

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    router.push("/");
  };

  useEffect(() => {
    if (token) {
      const fetchUserInformation = async () => {
        try {
          const request = await axios.get(`${base_url}/getUser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const response = await request.data;
          setUserInformation(response);
          setLoading(false);
        } catch (error) {
          // setTimeout(() => {}, 3000);
          // if (error.message === "Request failed with status code 401") {
          //   toast.error(
          //     <div className="toast-container">
          //       <span className="toast-message">
          //         {" "}
          //         لطفا دوباره وارد حساب خود شوید!{" "}
          //       </span>
          //       <Link className="toast-link" href={"/login"}>
          //         {" "}
          //         صفحه ورود{" "}
          //       </Link>
          //     </div>,
          //     {
          //       position: "top-right",
          //       autoClose: 4000,
          //       hideProgressBar: false,
          //       closeOnClick: true,
          //       pauseOnHover: true,
          //       draggable: true,
          //       progress: undefined,
          //       theme: "light",
          //       transition: Bounce,
          //     }
          //   );
          // }
        }
      };
      fetchUserInformation();
    }
  }, [token]);

  const fetchPurchasedInfo = async () => {
    if (token) {
      try {
        const request = await axios.get(`${base_url}/user-products/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await request.data;
        if (response.length > 0) {
          const licensesArray = response.map(
            (product) => product.infoLicense.license_key
          );
          const titlesArray = response.map((product) => product.product.title);
          setLicenses(licensesArray);
          setTitles(titlesArray);
          setShowLicenses(true);
          setShowBought(true);
        } else {
          setLicenses([]);
          setTitles([]);
          setShowLicenses(true);
          setShowBought(false);
        }
      } catch (error) {}
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
      alert("لایسنس کپی نشد دستی اقدام کنید ");
    }
    document.body.removeChild(textArea);
  };

  if (!loading && !token) {
    return (
      <div className={styles.wrapper}>
        <ToastContainer rtl />
        <h1> موردی برای نمایش موجود نیست! </h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <ToastContainer rtl />
        <h1> در حال بارگذاری اطلاعات... </h1>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <ToastContainer rtl />
        <div className={styles.sidePanel}>
          <div className={styles.info}>
            <span> {userInformations.name} </span>
            <span className={styles.phone}> {userInformations.phone} </span>
          </div>
          <ul>
            <li onClick={() => setShowLicenses(false)}>
              <GoHomeFill fontSize={22} /> حساب کاربری
            </li>
            <li onClick={fetchPurchasedInfo}>
              <HiAcademicCap fontSize={22} />
              دوره های من
            </li>
            <li className={styles.logout} onClick={logout}>
              <IoIosLogOut fontSize={22} fill="#ff0000" /> خروج
            </li>
          </ul>
        </div>
        <div className={styles.mainContent}>
          {showLicenses ? (
            showBought ? (
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
            )
          ) : (
            <>
              <h1>سلام {userInformations.name} عزیز ❤️</h1>
              <p>
                در قسمت <span onClick={fetchPurchasedInfo}>دوره های من</span>{" "}
                میتوانید تمام دوره هایی که شرکت کردید و نحوه دسترسی به آن را
                ببنید.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default Dashboard;
