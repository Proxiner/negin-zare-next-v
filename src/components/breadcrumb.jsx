import React, { useState } from "react";

import Link from "next/link";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

import styles from "./_breadcrumb.module.scss";

function BreadCrumb({
  title,
  proceedTitle,
  hrefProceed,
  show,
  handlePurchase,
}) {
  return (
    <div className={styles.checkoutNav}>
      {show && (
        <Link className={styles.link} href={"/courses"}>
          <FaArrowRightLong />
        </Link>
      )}

      <span className={styles.navText}>{title}</span>

      {show ? (
        <button className={styles.navLink} onClick={handlePurchase}>
          {" "}
          پرداخت <FaArrowLeftLong />{" "}
        </button>
      ) : (
        <Link href={hrefProceed} className={styles.navLink}>
          {proceedTitle}
          <FaArrowLeftLong />
        </Link>
      )}
    </div>
  );
}

export default BreadCrumb;
