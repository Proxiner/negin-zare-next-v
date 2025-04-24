"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useStripHtml from "@/hooks/useStripHtml";
import { IoEye } from "react-icons/io5";
import styles from "./_courses.module.scss";
import Image from "next/image";
import Link from "next/link";
import { base_url } from "@/api/url";
import { toast, Bounce } from "react-toastify";

const fetchCourses = async () => {
  const { data } = await axios.get(`${base_url}/products`);
  return data;
};

export default function Courses() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const stripHtml = useStripHtml();

  // 1) Fetch courses via React Query
  const {
    data: courses = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // 2) Invalidate & refetch when navigating back to this route
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === router.pathname) {
        queryClient.invalidateQueries(["courses"]);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, router.pathname, queryClient]);

  // 3) Loading state
  if (isLoading) {
    return <div className={styles.loading}>در حال بارگذاری دوره‌ها…</div>;
  }

  // 4) Error state
  if (isError) {
    toast.error(
      <div className="toast-container">
        <span className="toast-message">
          خطا در نمایش دوره‌ها: {error.message}
        </span>
      </div>,
      {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      }
    );
    return <div className={styles.error}>خطا در بارگذاری دوره‌ها.</div>;
  }

  // 5) Compute discounted prices
  const coursePrices = {};
  courses.forEach((course) => {
    let finalPrice = course.price;
    let hasDiscount = false;

    if (course.discount_type === "percent") {
      const discount = course.price * (course.discount_value / 100);
      finalPrice = course.price - discount;
      hasDiscount = true;
    } else if (course.discount_type === "static") {
      finalPrice = course.price - course.discount_value;
      hasDiscount = true;
    }

    coursePrices[course.id] = {
      price: finalPrice.toLocaleString("fa-IR"),
      hasDiscount,
      original: course.price.toLocaleString("fa-IR"),
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>نگین | دوره‌ها 💄</title>
      </Head>

      {courses.map((course) => {
        const { price, hasDiscount, original } = coursePrices[course.id] || {};

        return (
          <div key={course.id} className={styles.courseContainer}>
            <Image
              width={400}
              height={300}
              src={`http://neginzare.com:8080/storage/${course.thumbnail}`}
              alt={stripHtml(course.headline)}
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
                      {original} تومان
                    </span>
                  </>
                ) : (
                  <span className={styles.originalPrice}>{original} تومان</span>
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
