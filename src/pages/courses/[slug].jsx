import React, { useEffect, useState } from "react";
import styles from "./_courseHeader.module.scss";

import CourseDetails from "./courseDetails";
import Image from "next/image";
import axios from "axios";
import PopMessage from "@/components/popMessage";
import { FaPlus, FaMinus } from "react-icons/fa6";

import useStripHtml from "@/hooks/useStripHtml";
import useTitle from "@/hooks/useTitle";

const CourseDetail = ({ course }) => {
  const stripHtml = useStripHtml();

  useTitle(`دوره | ${course.title} 💄`);

  const url = "http://45.139.10.86:8080/api";

  const [message, setMessage] = useState();
  const [showButton, setShowButton] = useState(false);
  const [buttonState, setButtonState] = useState("default");
  const [exist, setExist] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem("token")?.replace(/"/g, "");
    if (storedToken) {
      setToken(storedToken);
    } else {
      // setMessage("login-required");
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(`${url}/cart/list`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const courseExists = response.data.items.some(
            (item) => item.id === course.id
          );
          setExist(courseExists);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            // setMessage("login-required");
          } else {
            console.error("Error fetching cart list:", error);
          }
        });
    }
  }, [token, course.id]);

  useEffect(() => {
    if (token) {
      switch (buttonState) {
        case "add":
          axios
            .post(
              `${url}/cart/add`,
              { productId: course.id },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              console.log(response.data);
              setExist(true);
              setShowButton(false);
            })
            .catch((error) => {
              console.error("Error adding to cart:", error);
            });
          break;

        case "remove":
          axios
            .post(
              `${url}/cart/remove`,
              { productId: course.id },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              console.log(response.data);
              setExist(false);
              setShowButton("default");
            })
            .catch((error) => {
              console.error("Error removing from cart:", error);
            });
          break;

        case "default":
          setShowButton(true);
          break;
      }
    }
  }, [buttonState, token]);

  return (
    <>
      {message === "login-required" && (
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
            {exist ? (
              <button
                className={styles.remove}
                onClick={() => setButtonState("remove")}
              >
                <Image
                  width={30}
                  height={30}
                  src={"/assets/icons/remove.svg"}
                  alt="remove-from-cart"
                />
                حذف از سبد خرید
              </button>
            ) : (
              <button
                className={styles.buy}
                onClick={() => setButtonState("add")}
              >
                <Image
                  width={30}
                  height={30}
                  src={"/assets/icons/add.svg"}
                  alt="add-to-cart"
                />
                افزودن به سبد خرید
              </button>
            )}
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
