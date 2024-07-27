import React, { useEffect, useState } from "react";
import styles from "./_courseHeader.module.scss";

import CourseDetails from "./courseDetails";
import Image from "next/image";
import axios from "axios";

import useStripHtml from "@/hooks/useStripHtml";
import useTitle from "@/hooks/useTitle";

import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";

import { base_url } from "@/api/url";

import Link from "next/link";
import { useRouter } from "next/router";

const CourseDetail = ({ course }) => {
  const stripHtml = useStripHtml();

  useTitle(`دوره | ${course.title} 💄`);

  const [exist, setExist] = useState(false);
  const [token, setToken] = useState();

  const router = useRouter();

  useEffect(() => {
    const getToken = localStorage.getItem("token")?.replace(/"/g, "");
    if (getToken !== null) {
      setToken(getToken);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const cartList = async () => {
        try {
          const response = await axios.get(`${base_url}/cart/list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data.items;
          console.log(response.data)
          const cartLength = response.data.items.length;
          const listCourses = data.map((item) => item.slug);
          const courseSlug = listCourses.find((slug) => slug === course.slug);

          if(courseSlug === course.slug){
            if(cartLength > 0){
              setExist(true)
            }
          }
        } catch (error) {
          console.error(error.message);
        }
      };

      cartList();
    }
  }, [token , exist]);

  const addCourse = async () => {
    try {
      const response = await axios.post(`${base_url}/cart/add`, {productId : course.id} , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.status;
      if(data){
        setExist(true);
      }else{
        setExist(false)
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <ToastContainer rtl toastClassName={styles.toast} />
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
                onClick={() => router.push('/cart')}
              >
                ادامه خرید دوره
               <FaArrowLeftLong/>
              </button>
            ) : (
              <button
                className={styles.buy}
                onClick={addCourse}
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
  const response = await axios.get(`${base_url}/products`);
  const courses = response.data;
  const paths = courses.map((course) => ({
    params: { slug: course.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`${base_url}/product/${params.slug}`);
  const course = response.data;

  return { props: { course } };
}

export default CourseDetail;
