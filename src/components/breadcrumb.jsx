import React from "react";

import Link from "next/link";
import Image from "next/image";

import styles from "./_breadcrumb.module.scss";

function BreadCrumb({
  title,
  currentHref,
  proceedTitle,
  hrefProceed,
  proceedIcon
}) {
  return (
    <div className={styles.checkoutNav}>
      <span className={styles.navText}>
        {title}
      </span>
      <Link href={currentHref}>
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={100}
          height={50}
          className={styles.navImage}
        />
      </Link>
      <Link href={hrefProceed} className={styles.navLink}>
        {proceedTitle}
        {proceedIcon}
      </Link>
    </div>
  );
}

export default BreadCrumb;
