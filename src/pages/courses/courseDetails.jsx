import React from "react";

import styles from "./_courseDetails.module.scss";

import WindowsImage from "../../components/windowsImage";
import { FaEye } from "react-icons/fa";
import Link from "next/link";

const CourseDetails = ({
  courseImgSource,
  courseTitle,
  courseDetails,
  courseHours,
  courseSignedCount,
  coursePrice,
  courseLink
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.coverSection}>
        <WindowsImage
          width={200}
          height={300}
          imageWidth={100}
          imageHeight={100}
          imageRadius="300px 300px 0 0"
          imageSrc={courseImgSource}
        />
      </div>
      <div className={styles.details}>
        <h2> {courseTitle} </h2>
        <p> {courseDetails} </p>
        <div className={styles.hours}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="32px"
            height="32px"
          >
            <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 15 8 L 15 17 L 22 17 L 22 15 L 17 15 L 17 8 Z" />
          </svg>
          {courseHours} ساعت
        </div>
        <div className={styles.row}>
          <div className={styles.customersSigned}>{courseSignedCount} نفر</div>
          <div className={styles.price}>
            <span>قیمت :</span>
            {coursePrice}
          </div>
        </div>
        <Link className={styles.redirect} href={courseLink}>
        <FaEye color="#fff" fontSize="1.1rem"/>
          مشاهده دوره
        </Link>
      </div>
    </div>
  );
};

export default CourseDetails;
