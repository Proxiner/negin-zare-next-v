import React, { useEffect, useState } from "react";
import useStripHtml from "@/hooks/useStripHtml";
import { IoEye } from "react-icons/io5";
import styles from "./_courses.module.scss";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import useTitle from "@/hooks/useTitle";
import { base_url } from "@/api/url";
import { toast, Bounce } from "react-toastify";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [coursePrices, setCoursePrices] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/products`);
        setCourses(response.data);
      } catch (error) {
        toast.error(
          <div className="toast-container">
            <span className="toast-message">خطا در نمایش دوره ها</span>
          </div>,
          {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      }
    };

    fetchData();
  }, []);

  useTitle("نگین | دوره ها 💄");

  const stripHtml = useStripHtml();

  useEffect(() => {
    const updatedCoursePrices = {};

    courses.forEach((course) => {
      let discountPrice;
      switch (course.discount_type) {
        case "percent":
          const calculateDiscount =
            course.price * (course.discount_value / 100);
          discountPrice = course.price - calculateDiscount;
          updatedCoursePrices[course.id] = {
            price: discountPrice.toLocaleString("fa-IR"),
            hasDiscount: true,
          };
          break;
        case "static":
          discountPrice = course.discount_value;
          updatedCoursePrices[course.id] = {
            price: discountPrice.toLocaleString("fa-IR"),
            hasDiscount: true,
          };
          break;
        default:
          updatedCoursePrices[course.id] = {
            price: course.price.toLocaleString("fa-IR"),
            hasDiscount: false,
          };
          break;
      }
    });

    setCoursePrices(updatedCoursePrices);
  }, [courses]);

  return (
    <div className={styles.container}>
      {courses.map((course) => {
        const { price, hasDiscount } = coursePrices[course.id] || {};
        return (
          <div key={course.id} className={styles.courseContainer}>
            <Image
              width={400}
              height={300}
              src={`/assets/images/${course.thumbnail}`}
              alt=""
            />
            <h2>{stripHtml(course.headline)}</h2>
            <p>{stripHtml(course.body)}</p>
            <div className={styles.row}>
              <div className={styles.priceContainer}>
                {hasDiscount ? (
                  <>
                    <span className={styles.discountedPrice}>
                      {price} تومان
                    </span>
                    <span className={styles.originalPrice}>
                      {course.price.toLocaleString("fa-IR")} تومان
                    </span>
                  </>
                ) : (
                  <>
                    <span className={styles.originalPrice}>
                      {course.price.toLocaleString("fa-IR")} تومان
                    </span>
                  </>
                )}
              </div>
              <Link href={`/courses/${course.slug}`}>
                <IoEye /> مشاهده دوره
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Courses;
