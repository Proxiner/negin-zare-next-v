import React from "react";
import styles from "./_couresTitles.module.scss";

const courseTitles = () => {
  return (
    <details className={styles.container}>
      <summary>مشاهده سرفصل های دوره</summary>
      <ul className={styles.content}>
        <li className={styles.liItem}>ویدئو آرایش حرفه ای</li>
        <li className={styles.liItem}>ویدئو آرایشگری و تکنیک های مدرن</li>
        <li className={styles.liItem}>ویدئو میکاپ عروس</li>
        <li className={styles.liItem}>ویدئو آموزش آرایش چشم</li>
        <li className={styles.liItem}>ویدئو آموزش میکاپ تخصصی</li>
      </ul>
    </details>
  );
};

export default courseTitles;
