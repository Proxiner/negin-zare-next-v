import React, { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
import BluredBlob from "@/components/bluredBlob";
import styles from "./_navbar.module.scss";
import { useRouter } from "next/router";

const Navbar = ({ hrefRoute }) => {
  const menuContent = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === "/courses" || url === "/") {
        setIsMenuOpen(false);
        menuContent.current.style.right = "-512px";
        document.body.style.overflowY = "auto";
        document.documentElement.style.overflowY = "auto";
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (cartCount === 0) {
      setShowBadge(false);
    } else {
      setShowBadge(true);
    }
  }, [cartCount]);

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
          <li><Link href="/">خانه</Link></li>
          <li><Link href="/coming-soon">خدمات</Link></li>
          <li><Link href="/courses">دوره ها</Link></li>
          <li><Link href="/coming-soon">وبلاگ</Link></li>
          <li><Link href="/coming-soon">درباره ما</Link></li>
        </ul>
        <div className={styles.callToAction}>
          <Link href={hrefRoute}>
            <button>
              <FaRegUser /> حساب کاربری
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.phoneMenuContainer}>
        <div className={styles.hamMenu} onClick={toggleMenu}>
          <svg
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

        <div className={styles.cart}>
          <Link href={"/cart"}>
            <Image
              width={25}
              height={25}
              src={"/assets/icons/cart.svg"}
              alt="myCart"
            />
          </Link>
        </div>
      </div>

      <div className={styles.container}>
        <ul>
          <li><Link href="/">خانه</Link></li>
          <li><Link href="/coming-soon">خدمات</Link></li>
          <li><Link href="/courses">دوره ها</Link></li>
          <li><Link href="/coming-soon">وبلاگ</Link></li>
          <li><Link href="/coming-soon">درباره ما</Link></li>
        </ul>

        <div className={styles.logoContainer}>
          <Image
            width={100}
            height={50}
            className={styles.logo}
            src="/assets/images/logo.png"
            alt="logo negin zare"
          />
        </div>

        <div className={styles.callToAction}>
          <Link className={styles.cart} href={"/cart"}>
            <span className={`${styles.badge} ${showBadge ? styles.animate : ""}`}>
              {cartCount}
            </span>
            <PiShoppingCartSimpleFill fill="#111" />
          </Link>
          <div className={styles.verticalLine}></div>
          <Link href={hrefRoute}>
            <button>
              <FaRegUser /> حساب کاربری
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
