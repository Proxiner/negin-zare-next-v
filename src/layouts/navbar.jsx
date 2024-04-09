import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import BluredBlob from "@/components/bluredBlob";

import styles from "./_navbar.module.scss";

const Navbar = () => {
  const menuContent = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleHelp = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      menuContent.current.style.right = "-512px";
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflowY = "auto";
    } else {
      menuContent.current.style.right = "0";
      document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "hidden";
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      menuContent.current.style.right = "-512px";
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflowY = "auto";
    } else {
      menuContent.current.style.right = "0";
      document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "hidden";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.phoneNavContent} ref={menuContent}>
        <BluredBlob right={-30} top={-130} zIndex={-1} opacity={0.8} />

        <ul>
          <Link href="/">خانه</Link>
          <Link href="/coming-soon">خدمات</Link>
          <Link href="/coming-soon">آموزش</Link>
          <Link href="/coming-soon">وبلاگ</Link>
          <Link href="/coming-soon">درباره ما</Link>
        </ul>
        <div className={styles.callToAction}>
          <Link href="#help" onClick={toggleHelp}>
            <button>مشاوره رایگان</button>
          </Link>
        </div>
      </div>

      <div className={styles.phoneMenuContainer}>
        <div className={styles.hamMenu}>
          <svg
            onClick={toggleMenu}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 22 22"
            fill="none"
          >
            {isMenuOpen ? (
              <>
                <path
                  className={styles.pathCrossed}
                  d="M3.4375 5.5L18.5625 18.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className={styles.pathCrossed}
                  d="M3.4375 18.5L18.5625 5.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            ) : (
              <path
                className={styles.pathDefault}
                d="M3.4375 11H18.5625M3.4375 5.5H18.5625M3.4375 16.5H18.5625"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>

        <div className={styles.mobileLogo}>
          <Image
            width={100}
            height={100}
            src={
              isMenuOpen
                ? "/assets/images/phone-logo.png"
                : "/assets/images/logo.png"
            }
            className={styles.selectedLogo}
            alt="logo negin zare"
          />
        </div>

        <div className={styles.chatbox}>
          <Link href="#help">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M6.15312 12.375L2.75 15.125V4.125C2.75 3.94266 2.82243 3.7678 2.95136 3.63886C3.0803 3.50993 3.25516 3.4375 3.4375 3.4375H14.4375C14.6198 3.4375 14.7947 3.50993 14.9236 3.63886C15.0526 3.7678 15.125 3.94266 15.125 4.125V11.6875C15.125 11.8698 15.0526 12.0447 14.9236 12.1736C14.7947 12.3026 14.6198 12.375 14.4375 12.375H6.15312Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.875 12.375V15.8125C6.875 15.9948 6.94743 16.1697 7.07636 16.2986C7.2053 16.4276 7.38016 16.5 7.5625 16.5H15.8469L19.25 19.25V8.25C19.25 8.06766 19.1776 7.8928 19.0486 7.76386C18.9197 7.63493 18.7448 7.5625 18.5625 7.5625H15.125"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className={styles.container}>
        <ul>
          <Link href="/">خانه</Link>
          <Link href="/coming-soon">خدمات</Link>
          <Link href="/coming-soon">آموزش</Link>
          <Link href="/coming-soon">وبلاگ</Link>
          <Link href="/coming-soon">درباره ما</Link>
        </ul>

        <div className={styles.logoContainer}>
          <Image
            width={100}
            height={100}
            className={styles.logo}
            src="/assets/images/logo.png"
            alt="logo negin zare"
          />
        </div>

        <div className={styles.callToAction}>
          <Link href="#help">
            <button>مشاوره رایگان</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
