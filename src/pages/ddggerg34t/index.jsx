"use client";

import React, { useEffect } from "react";

import styles from "./_course.module.scss";

import CourseHero from "./courseHero";
import CourseTitles from "./courseTitles";

const Course = () => {
  useEffect(() => {
    document.title = "نگین | دوره اسموکی 💄";
  }, []);

  return (
    <>
      <div className={styles.container}>
        <CourseHero />
        <CourseTitles />
      </div>
    </>
  );
};

export default Course;
