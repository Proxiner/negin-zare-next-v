import React, { useEffect, useState } from "react";

import useStripHtml from "@/hooks/useStripHtml";

import styles from "./_courses.module.scss";
import axios from "axios";

import Image from "next/image";

import Link from "next/link";
import useTitle from "@/hooks/useTitle";

function Courses() {
  const [courses, setCourses] = useState([]);

  const url = "http://45.139.10.86:8080/api";

  useEffect(() => {
    axios.get(`${url}/products`).then((response) => setCourses(response.data));
  }, []);

  useTitle("نگین | دوره ها 💄");

  const stripHtml = useStripHtml();

  return (
    <div className={styles.container}>
      {courses.map((course) => (
        <div key={course.id} className={styles.courseContainer}>
          <Image
            width={400}
            height={300}
            src={`/assets/images/${course.thumbnail}`}
            alt=""
          />
          <h2> {stripHtml(course.headline)} </h2>
          <p> {stripHtml(course.body)} </p>
          <div className={styles.row}>
            <span> {course.price.toLocaleString("fa-IR")} تومان</span>
            <Link href={`/courses/${course.slug}`}> مشاهده دوره </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Courses;
