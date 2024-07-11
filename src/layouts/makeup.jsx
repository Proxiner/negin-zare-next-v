import React, { useEffect, useRef } from "react";

import styles from "./_makeup.module.scss";
import ProductListing from "../components/productListing";
import BluredBlob from "../components/bluredBlob";

import Image from "next/image";

const Makeup = () => {
  return (
    <div className={styles.container}>
      <BluredBlob bottom={-250} left={-100} zIndex={-1} opacity={0.5} />

      <section className={styles.modelContainer}>
        <div className={styles.image}>
          <Image
            width={600}
            height={800}
            src="/assets/images/makeup.svg"
            alt="makeup"
          />
        </div>
      </section>

      <div className={styles.introduction}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M20 0L21.9134 15.3806L34.1421 5.85786L24.6194 18.0866L40 20L24.6194 21.9134L34.1421 34.1421L21.9134 24.6194L20 40L18.0866 24.6194L5.85786 34.1421L15.3806 21.9134L0 20L15.3806 18.0866L5.85786 5.85786L18.0866 15.3806L20 0Z"
            fill="#070604"
          />
        </svg>
        <h3>
          <span>پکیج های</span> میکاپ عروس
        </h3>
        <p>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد
        </p>
        <button>بیشتر بخوانید</button>
      </div>

      <div className={styles.productListContainer}>
        <ProductListing
          indicator="۰۱"
          pulledSrc="assets/icons/people.svg"
          title="پکیج میکاپ همراه با تیم نگین"
          details="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها ابزارهای کاربردی می باشد"
        />

        <div className={styles.line}></div>

        <ProductListing
          indicator="۰۲"
          pulledSrc="assets/icons/crown.svg"
          title="پکیچ میکاپ VIP با خود نگین"
          details="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها ابزارهای کاربردی می باشد"
        />
      </div>
    </div>
  );
};

export default Makeup;
