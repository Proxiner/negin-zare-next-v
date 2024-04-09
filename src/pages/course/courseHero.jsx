import React from "react";
import styles from "./_courseHero.module.scss";

import CourseDetails from "./courseDetails";

import Image from "next/image";

const courseHero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <header>
          <h2>آموزش صفر تا صد تخصصی میکاپ عروسی</h2>
          <p>
            مدرس تخصصی آموزش صفرتاصد و آپدیت دوره عروس و فشن بیش از ۲۰۰۰ تا
            هنرجوی حضوری و آنلاین از سرتاسر ایران
          </p>
        </header>
        <section>
          <CourseDetails
            price="۲۰.۰۰۰.۰۰۰"
            hours="۸۰ ساعت آموزش"
            sessions="۱۵ جلسه"
            instructor="نگین زارع"
            type="آنلاین"
          />
          <button className={styles.buy}>
            <Image
              width={30}
              height={30}
              src="/assets/icons/buy.svg"
              alt="buy"
            />{" "}
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

export default courseHero;
