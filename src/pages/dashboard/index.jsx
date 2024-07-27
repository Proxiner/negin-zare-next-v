import React, { useEffect, useState } from "react";

import styles from "./_dashboard.module.scss";

import { IoIosLogOut } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";

import { useRouter } from "next/router";

import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import useTitle from "@/hooks/useTitle";

const Index = () => {
  useTitle("نگین | پنل کاربری 💄");

  const [userData, setData] = useState([]);
  const [token, setToken] = useState();
  const [license, setLicense] = useState();
  const [output, set_out_put] = useState(true);
  const [showLicense, setShowLicense] = useState(false);

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const url = "http://45.139.10.86:8080/api";

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
      set_out_put(false);
    } else {
      const storedToken = localStorage.getItem("token").replace(/"/g, "");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .post(
          `${url}/getLicense`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setLicense(response.data.license);
        })
        .catch((message) => {
          if (message.message === "Request failed with status code 401") {
            toast.warning(
              <>
                <span className="message"> لطفا وارد حساب خود شوید! </span>
                <Link href="/login" className="redirect">
                  👈 صفحه ورود
                </Link>
              </>,
              {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              }
            );
          }
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .get(`${url}/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
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

  const { name, email, phone } = userData;

  if (output === false) {
    return (
      <div className={styles.wrapper}>
        <ToastContainer rtl toastClassName={styles.toast} />
        <h1> موردی برای نمایش موجود نیست! </h1>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <ToastContainer rtl toastClassName={styles.toast} />
        <div className={styles.title}>
          <h1>- پنل کاربری</h1>
          <h3>خوش اومدی {name} عزیز 👋 </h3>
          <button onClick={logout}>
            <IoIosLogOut
              className={styles.logoutIco}
              color="red"
              fontSize="1.2rem"
            />
            <span>خروج از حساب</span>
          </button>
        </div>
        <div className={styles.panelContent}>
          <div className={styles.sidePanel}>
            <ul>
              <li>اطلاعات کاربری</li>
              <li>نام کاربری : {name} </li>
              <li>شماره همراه : {phone}</li>
              <li>ایمیل : {email}</li>
            </ul>
            <button onClick={() => setShowLicense(!showLicense)}>
              {!showLicense ? "نمایش" : "مخفی کردن"} لایسنس دوره من
            </button>
            {showLicense ? (
              <div className={styles.userLicense}>
                <MdContentCopy
                  onClick={copyLicense}
                  fontSize="1.2rem"
                  style={{ marginleft: "1rem", cursor: "pointer" }}
                />{" "}
                کد لایسنس : <span>{license}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.videoContainer}>
            <a href="https://spotplayer.ir/help/guide" target="_blank">
              <h2>نحوه اضافه کردن دوره :</h2>
              <video loop autoPlay>
                <source src="/assets/license-vid.mp4" type="video/mp4" />
              </video>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
