import React from "react";

//Style
import styles from "./_guidance.module.scss";
import BluredBlob from "../components/bluredBlob";

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
            <span className={styles.titleOne}> هنر دستان من </span>
            <span className={styles.titleTwo}> معجزه می کند </span>
          </div>
        </div>

        <div className={styles.boxForm}>
          <div className={styles.getFreeQuidance}>
            <p>
              دریافت <br />
              <span> مشاوره رایگان </span>
            </p>
          </div>

          <form action="#">
            <input
              name="fullNmae"
              id="fullName"
              placeholder="نام و نام خانوادگی"
            />
            <input
              name="phoneNumber"
              id="phoneNumber"
              placeholder="شماره تماس"
            />
            <input name="option" id="option" placeholder="بخش مشاوره" />
            <button type="submit"> ارسال </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Guidance;
