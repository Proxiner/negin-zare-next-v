import React, { useEffect, useState } from "react";
import useStripHtml from "@/hooks/useStripHtml";
import { IoEye } from "react-icons/io5";
import styles from "./_courses.module.scss";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import useTitle from "@/hooks/useTitle";
import { base_url } from "@/api/url";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/products`);
        setCourses(response.data);
        console.clear();
      } catch (error) {
        toast.error(
          <div className="toast-container">
            <span className="toast-message">
              خطا در نمایش دوره ها
            </span>
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

  const calculateDiscountedPrice = (price, discountType, discountValue) => {
    if (discountType === "percent" && discountValue) {
      return price - (price * discountValue) / 100;
    }
    return price;
  };

  return (
    <div className={styles.container}>
      {courses.map((course) => {
        const discountedPrice = calculateDiscountedPrice(
          course.price,
          course.discount_type,
          course.discount_value
        );
        const hasDiscount = course.discount_type === "percent" && course.discount_value;

        return (
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
              <div className={styles.priceContainer}>
                {hasDiscount && (
                  <span className={styles.originalPrice}>
                    {course.price.toLocaleString("fa-IR")} تومان
                  </span>
                )}
                <span className={hasDiscount ? styles.discountedPrice : ""}>
                  {discountedPrice.toLocaleString("fa-IR")} تومان
                </span>
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
