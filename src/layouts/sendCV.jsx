import React from "react";

import styles from "./_sendCV.module.scss";

import Image from "next/image";

const SendCV = () => {
  return (
    <>
      {/* <div className={styles.wrapper}> */}
      <div className={styles.cvContainer}>
        <div className={styles.logoContainer}>
          <Image
            width={120}
            height={120}
            src="/assets/images/phone-logo.png"
            alt="logo"
          />
        </div>

        <div className={styles.textAndImageContainer}>
          <div className={styles.textContainer}>
            <div className={styles.titleAndStar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
              >
                <path
                  d="M30 0L32.2961 24.4567L51.2132 8.7868L35.5433 27.7039L60 30L35.5433 32.2961L51.2132 51.2132L32.2961 35.5433L30 60L27.7039 35.5433L8.7868 51.2132L24.4567 32.2961L0 30L24.4567 27.7039L8.7868 8.7868L27.7039 24.4567L30 0Z"
                  fill="white"
                />
              </svg>

              <h1>تو هم میتونی عضو تیم خفن ما بشی...</h1>
            </div>

            <div className={styles.description}>
              <p>
                {" "}
                برای اینکه عضو تیم ما بشی، کافیه رزومه خودتو بصورت PDF برای ما
                ارسال کنی.
              </p>
            </div>

            <div className={styles.formContainer}>
              <form>
                <label htmlFor="fullName"> نام و نام خانوادگی </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="نام کامل خود را وارد کنید"
                />

                <label htmlFor="file"> بارگذاری فایل PDF </label>
                <input
                  type="file"
                  id="file"
                  className={styles.chooseFile}
                  accept="application/pdf"
                />

                <button type="submit"> ارسال </button>
              </form>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <div className={styles.imageCV}>
              <Image
                width={430}
                height={550}
                src="/assets/images/intro_2.webp"
                alt="model"
              />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default SendCV;
