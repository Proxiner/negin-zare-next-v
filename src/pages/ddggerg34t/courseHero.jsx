import React, { useEffect, useState } from "react";
import styles from "./_courseHero.module.scss";

import CourseDetails from "./courseDetails";

import Image from "next/image";

import axios from "axios";

const CourseHero = () => {
  const url = "http://45.139.10.86:8080/api";

  const [course, setCourse] = useState({});
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    axios.get(`${url}/products`).then((response) => {
      setCourse(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <header>
          <h2>{course.title}</h2>
          <p>{course.body}</p>
        </header>
        <section>
          <CourseDetails
            // price={course.price.toLocaleString("fa-IR")}
            hours="۱ ساعت آموزش"
            sessions={`${course.number_of_session} جلسه`}
            instructor={teacher.name}
            type={course.type}
          />
          <button className={styles.buy}>
            <Image
              width={30}
              height={30}
              src={"/assets/icons/buy.svg"}
              alt="buy"
            />
            ثبت نام در دوره
          </button>
        </section>
      </div>

      <div className={styles.courseModel}>
        <Image
          width={400}
          height={600}
          src={"/assets/images/courses_1.jpg"}
          alt="course image"
        />
      </div>
    </div>
  );
};

export default CourseHero;
