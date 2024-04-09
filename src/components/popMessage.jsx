import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import Image from "next/image";

import styles from "./_popMessage.module.scss";

const PopMessage = ({ message, imageSrc, tryAgain }) => {
  const router = useRouter();

  const line = useRef();

  const content = useRef();

  const [timer, setTimer] = useState(3);

  useEffect(() => {
    console.log(content.current.children[1].textContent);
    if (
      content.current.children[1].textContent ===
      "حساب کاربری با موفقیت ساخته شد :)"
    ) {
      line.current.style.backgroundColor = "limegreen";
      content.current.children[1].style.color = "limegreen";
    } else {
      line.current.style.backgroundColor = "red";
      content.current.children[1].style.color = "red";
    }
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
        line.current.style.width = "0";
      } else {
        clearInterval(interval); // تایمر را متوقف کنید
        if (
          content.current.children[1].textContent ===
          "حساب کاربری با موفقیت ساخته شد :)"
        ) {
          router.push("/login"); // انتقال به مسیر جدید
        } else {
          router.reload();
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
        <h3>{message}</h3>
        <span>
          {" "}
          {tryAgain} {timer} ثانیه
        </span>
        <div className={styles.line} ref={line}></div>
      </div>
    </div>
  );
};

export default PopMessage;
