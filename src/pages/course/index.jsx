"use client";

import React from "react";

import styles from "./_course.module.scss";

import CourseHero from "./courseHero";
import CourseTitles from "./courseTitles";

const Course = () => {
  return (
      <div className={styles.container}>
        <CourseHero />
        <CourseTitles />
      </div>
  );
};

export default Course;
