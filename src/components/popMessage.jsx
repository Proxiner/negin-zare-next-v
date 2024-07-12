import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";

import styles from "./_popMessage.module.scss";

const PopMessage = ({ warning, message, imageSrc, tryAgain, again }) => {
  const router = useRouter();

  const line = useRef();

  const content = useRef();

  const [timer, setTimer] = useState(3);

  const [showTimer, setShow] = useState(true);

  useEffect(() => {
    content.current;
  });

  useEffect(() => {
    switch (content.current.children[1].textContent) {
      case "حساب کاربری با موفقیت ساخته شد :)":
        content.current.children[1].style.color = "limegreen";
        line.current.style.backgroundColor = "limegreen";
        setShow(true);
        break;

      case "این حساب کاربری قبلا ایجاد شده است :(":
        content.current.children[1].style.color = "orange";
        line.current.style.backgroundColor = "white";
        setShow(false);
        break;

      case "برای خرید باید وارد شوید":
        content.current.children[1].style.color = "orange";
        line.current.style.backgroundColor = "white";
        setShow(false);
        break;

      case "توکن شما منقضی شده":
        content.current.children[1].style.color = "red";
        line.current.style.backgroundColor = "red";
        setShow(true);
        break;

      case "لطفا وارد حساب خود شوید":
        content.current.children[1].style.color = "#ff0000";
        line.current.style.backgroundColor = "#ff0000";
        setShow(true);
        break;

      default:
        content.current.children[1].style.color = "red";
        line.current.style.backgroundColor = "red";
        setShow(true);
        break;
    }

    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
        line.current.style.width = "0";
      } else {
        clearInterval(interval);
        switch (content.current.children[1].textContent) {
          case "حساب کاربری با موفقیت ساخته شد :)":
            router.push("/login");
            break;
          case "لطفا مجددا وارد حساب خود شوید!":
            router.push("/login");
            break;
          case "برای خرید باید وارد شوید":
            break;
          case "این حساب کاربری قبلا ایجاد شده است :(":
            break;
          case "لطفا وارد حساب خود شوید":
            router.push("/login");
            break;
          default:
            router.reload();
            break;
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.content} ref={content}>
        <Image width={35} height={35} src={imageSrc} alt="thumbs up or down" />
        {warning}
        <h3>{message}</h3>
        <span>
          {tryAgain} {showTimer ? `${timer} ثانیه` : ""}
          <Link href="/login" style={{ color: "blue" }}>
            {again}
          </Link>
        </span>
        <div className={styles.line} ref={line}></div>
      </div>
    </div>
  );
};

export default PopMessage;
