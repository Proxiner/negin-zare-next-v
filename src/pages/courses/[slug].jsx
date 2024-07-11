import React from "react";
import styles from "./_courseHeader.module.scss";

import CourseDetails from "./courseDetails";

import Image from "next/image";

import axios from "axios";
import useStripHtml from "@/hooks/useStripHtml";
import useTitle from "@/hooks/useTitle";

const CourseDetail = ({ course }) => {
  if (!course) return <div>Loading...</div>;

  const stripHtml = useStripHtml();

  useTitle(`دوره | ${course.title} 💄`);

  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <header>
          <h2>{stripHtml(course.headline)}</h2>
          <p>{stripHtml(course.body)}</p>
        </header>
        <section>
          <CourseDetails
            price={course.price.toLocaleString("fa-IR")}
            hours="۱ ساعت آموزش"
            sessions={`${course.number_of_session} جلسه`}
            instructor={course.teacher.name}
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
          src={`/assets/images/${course.thumbnail}`}
          alt="course image"
        />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const url = "http://45.139.10.86:8080/api";

  const response = await axios.get(`${url}/products`);
  const courses = response.data;
  const paths = courses.map((course) => ({
    params: { slug: course.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const url = "http://45.139.10.86:8080/api";

  const response = await axios.get(`${url}/product/${params.slug}`);
  const course = response.data;

  return { props: { course } };
}

export default CourseDetail;
