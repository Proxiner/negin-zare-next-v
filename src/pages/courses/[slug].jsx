import React, { useEffect, useState, useRef } from "react";
import styles from "./_courseHeader.module.scss";

import CourseDetails from "./courseDetails";
import Image from "next/image";
import axios from "axios";
import PopMessage from "@/components/popMessage";

import useStripHtml from "@/hooks/useStripHtml";
import useTitle from "@/hooks/useTitle";

const CourseDetail = ({ course }) => {
  const [addToCart, setAddToCart] = useState(false);
  const [message, setShowMessage] = useState("");
  const isInitialMount = useRef(true);

  if (!course) return <div>Loading...</div>;

  const stripHtml = useStripHtml();
  useTitle(`دوره | ${course.title} 💄`);

  const url = "http://45.139.10.86:8080/api";

  useEffect(() => {
    const storedToken = localStorage.getItem("token")?.replace(/"/g, "");

    if (!storedToken) {
      setShowMessage("need login");
      setAddToCart(false);
      return;
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    };

    if (addToCart) {
      axios
        .post(`${url}/cart/add?productId=${course.id}`, {}, axiosConfig)
        .then((response) => console.log(response.data))
        .catch((error) => console.error(error));
    } else {
      axios
        .post(`${url}/cart/remove?productId=${course.id}`, {}, axiosConfig)
        .then((response) => console.log(response.data))
        .catch((error) => console.error(error));
    }
  }, [addToCart, course.id]);

  return (
    <>
      {message === "need login" && (
        <PopMessage
          message="لطفا وارد حساب خود شوید"
          tryAgain="انتقال خودکار در"
          imageSrc={"/assets/icons/thumbs-down.gif"}
        />
      )}
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
            <button
              onClick={() => setAddToCart(!addToCart)}
              className={
                addToCart ? `${styles.buy} ${styles.remove}` : styles.buy
              }
            >
              {addToCart ? (
                <>
                  <Image
                    width={30}
                    height={30}
                    src={"/assets/icons/remove.svg"}
                    alt="remove-from-cart"
                  />
                  حذف از سبد خرید
                </>
              ) : (
                <>
                  <Image
                    width={30}
                    height={30}
                    src={"/assets/icons/add.svg"}
                    alt="add-to-cart"
                  />
                  افزودن به سبد خرید
                </>
              )}
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
    </>
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
