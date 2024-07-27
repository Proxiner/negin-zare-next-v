import React, { useEffect, useState } from "react";

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

const Index = () => {
  useTitle("نگین | پنل کاربری 💄");

  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState();
  const [license, setLicense] = useState();
  const [loading, setLoading] = useState(true);
  const [showLicense, setShowLicense] = useState(false);
  const [toggleLicense, setToggleLicense] = useState(false);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const push_user = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      toast.warning(
        <>
          <span className="message"> لطفا وارد حساب خود شوید! </span>
          <Link href="/login" className="redirect">
            👈 صفحه ورود
          </Link>
        </>,
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
    } else {
      const storedToken = localStorage.getItem("token").replace(/"/g, "");
      setToken(storedToken);
    }
  }, []);

  const fetchLicence = async () => {
    try {
      if (token) {
        const request = await axios.post(
          `${base_url}/getLicense`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const licence = await request.data.license;
        setLicense(licence);
        setToggleLicense(true);
      }
    } catch (error) {
      console.error(error.message);
      setToggleLicense(false);
    }
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`${base_url}/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((message) => console.log(message));
    }
  }, [token]);

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

  const copyLicense = () => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(license).then(
        function () {
          alert("کد لایسنس با موفقیت کپی شد");
        },
        function () {
          alert("لایسنس کپی نشد دستی اقدام کنید ");
        }
      );
    } else {
      unsecuredCopyToClipboard(license);
    }
  };

  if (loading === false) {
    return (
      <div className={styles.wrapper}>
        <ToastContainer rtl toastClassName={styles.toast} />
        <h1> موردی برای نمایش موجود نیست! </h1>
      </div>
    );
  }

  const { name, phone } = userData;

  return (
    <>
      <div className={styles.container}>
        <ToastContainer rtl toastClassName={styles.toast} />
        <div className={styles.sidePanel}>
          <div className={styles.info}>
            <span> {name} </span>
            <span className={styles.phone}> {phone} </span>
          </div>
          <ul>
            <li onClick={() => setToggleLicense(false)}>
              <GoHomeFill fontSize={22} /> حساب کاربری
            </li>
            <li onClick={fetchLicence}>
              <HiAcademicCap fontSize={22} />
              دوره های من
            </li>
            <li className={styles.logout} onClick={logout}>
              <IoIosLogOut fontSize={22} fill="#ff0000" /> خروج
            </li>
          </ul>
        </div>
        <div className={styles.mainContent}>
          {toggleLicense ? (
            <Licence licence={license} handleCopy={copyLicense} />
          ) : (
            <>
              <h1> سلام {name} عزیز ❤️ </h1>
              <p>
                در قسمت <span onClick={fetchLicence}>دوره های من</span> میتوانید تمام دوره هایی که شرکت
                کردید و نحوه دسترسی به آن را ببنید.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
