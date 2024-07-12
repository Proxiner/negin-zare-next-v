import React from "react";
import styles from "./_courseData.module.scss";

import { HiOutlineTrash } from "react-icons/hi";

import Image from "next/image";

function CourseData({imageSrc , title , type  , price}) {
  return (
    <div className={styles.container}>
      <Image
        width={150}
        height={150}
        src={imageSrc}
      />
      <div className={styles.column}>
        <h2> {title} </h2>
        {/* <span className={styles.teacher}> مدرس : {teacher} </span> */}
        <span className={styles.type}> نوع دوره : {type} </span>
        <span className={styles.price}> قیمت : {price} تومان</span>
      </div>
      <button className={styles.tooltip}>
        <HiOutlineTrash />
        <span className={styles.tooltiptext}> حذف از سبد خرید </span>
      </button>
    </div>
  );
}

export default CourseData;
