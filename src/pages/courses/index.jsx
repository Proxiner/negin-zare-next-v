"use client";

import React from "react";

import styles from "./_courses.module.scss";

import CourseDetails from "./courseDetails";

const Courses = () => {
  return (
    <div className={styles.container}>
      <CourseDetails
        courseImgSource="/assets/images/intro_3.jpg"
        courseTitle="عنوان دوره"
        courseDetails="توضیحات دوره"
        courseHours="۱۰۰ ساعت"
        courseSignedCount="۱۵"
        coursePrice="۳۰.۰۰۰.۰۰۰"
        courseLink={`/courses/2`}
      />
    </div>
  );
};

export default Courses;
