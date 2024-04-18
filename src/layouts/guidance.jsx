import React from "react";

//Style
import styles from "./_guidance.module.scss";
import BluredBlob from "../components/bluredBlob";

import Link from "next/link";

const Guidance = () => {
  return (
    <div className={styles.guidanceContainer} id="help">
      <BluredBlob bottom={-100} left={-50} zIndex={-2} opacity={0.7} />
      <div className={styles.guidanceContent}>
        <div className={styles.textContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
          >
            <path
              d="M25 0L27.3918 19.2258L42.6777 7.32233L30.7742 22.6082L50 25L30.7742 27.3918L42.6777 42.6777L27.3918 30.7742L25 50L22.6082 30.7742L7.32233 42.6777L19.2258 27.3918L0 25L19.2258 22.6082L7.32233 7.32233L22.6082 19.2258L25 0Z"
              fill="white"
            />
          </svg>
          <div className={styles.title}>
            <span className={styles.titleOne}>  تو هم میتونی عضو تیم </span>
            <span className={styles.titleTwo}> خفن ما بشی... </span>
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button> <Link href="/apply"> ارسال رزومه </Link> </button>
        </div>
      </div>
    </div>
  );
};

export default Guidance;
