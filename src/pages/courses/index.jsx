import React, { useEffect, useState } from "react";

import useStripHtml from "@/hooks/useStripHtml";

import styles from "./_courses.module.scss";
import axios from "axios";

import Image from "next/image";

import Link from "next/link";
import useTitle from "@/hooks/useTitle";
import { base_url } from "@/api/url";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`${base_url}/products`).then((response) => setCourses(response.data));
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
