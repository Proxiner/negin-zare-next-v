import React from "react";
import styles from "./_loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.container}>
      <h2 className={styles.loading}></h2>
      <div className={styles.loader}></div>
    </div>
  );
}
