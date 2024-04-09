import React from "react";

import styles from "./_coming-soon.module.scss";

import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className={styles.comingSoon}>
      این صفحه به زودی اضافه می شود !<Link href="/">بازگشت به خانه</Link>
    </div>
  );
};

export default ComingSoon;
