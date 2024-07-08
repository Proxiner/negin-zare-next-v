import React from "react";

import styles from "./_courseDetails.module.scss";

const courseDetails = ({ price, hours, sessions, instructor, type }) => {
  return (
    <section className={styles.details}>
      <h3> اطلاعات دوره: </h3>
      <div className={styles.price}>
        <span>قیمت دوره :</span>
        <span>
          {price} <i>تومان</i>
        </span>
      </div>

      <div className={styles.hours}>
        <span>زمان دوره : </span>
        <i>{hours}</i>
      </div>

      <div className={styles.sessions}>
        <span>تعداد جلسات : </span>
        <i>{sessions}</i>
      </div>

      <div className={styles.instructor}>
        <span>مدرس :</span>
        <i>{instructor}</i>
      </div>

      <div className={styles.type}>
        <span>نوع دوره : </span>
        <i>{type}</i>
      </div>
    </section>
  );
};

export default courseDetails;
