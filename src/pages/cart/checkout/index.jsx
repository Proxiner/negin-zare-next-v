import React, { useEffect, useState } from "react";

import styles from "./_checkout.module.scss";

import CheckoutBox from "./checkoutBox";
import axios from "axios";
import useTitle from "@/hooks/useTitle";
import BreadCrumb from "@/components/breadcrumb";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { base_url } from "@/api/url";

const CheckOut = () => {
  useTitle("صفحه | تکمیل خرید 🛒");
  const router = useRouter();

  const [course, setCourse] = useState([]);
  const [summition, setSummition] = useState({});
  const [token, setToken] = useState();
  const [purchaseID, setPurchaseID] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem("token")?.replace(/"/g, "");
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/cart/list`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setCourse(response.data.items);
        setSummition(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.info(
            <>
              <span className="message"> لطفا وارد حساب کاربری خود شوید! </span>
              <Link href="/login" className="redirect">
                👈 حساب کاربری
              </Link>
            </>,
            {
              position: "bottom-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            }
          );
        }
      }
    };

    if (storedToken) {
      fetchData();
      setToken(storedToken);
    }
  }, []);

  const handlePurchase = async () => {
    const storedToken = localStorage.getItem("token")?.replace(/"/g, "");
    const request = await axios.post(
      `${base_url}/order/create`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await request.data;
    setPurchaseID(response.orderId);
    if (purchaseID) {
      router.push(`${base_url}/purchase/${purchaseID}`);
    }
  };

  const removeCourse = async (courseId) => {
    console.log(courseId);
    if (token) {
      try {
        await axios.post(
          `${base_url}/cart/remove`,
          { productId: courseId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourse(course.filter((course) => course.id !== courseId));
      } catch (error) {
        console.error("Error removing course:", error);
        toast.error("خطا در حذف دوره!");
      }
    }
  };

  return (
    <div className={styles.container}>
      <BreadCrumb
        title={
          <>
            <Link style={{ color: "#111", textDecoration: "none" }} href={"/"}>
              {" "}
              خانه{" "}
            </Link>
            /
            <Link
              style={{ color: "#111", textDecoration: "none" }}
              href={"/cart"}
            >
              {" "}
              سبد خرید{" "}
            </Link>
            /
            <Link
              style={{ color: "#111", textDecoration: "none" }}
              href={"/cart/checkout"}
            >
              {" "}
              تکمیل پرداخت{" "}
            </Link>
            /
          </>
        }
        currentHref={router.route}
        proceedTitle={"مرحله بعد"}
        hrefProceed={router.route + "/checkout"}
        proceedIcon={<FaArrowLeftLong />}
      />
      <ToastContainer rtl toastClassName={styles.toast} />

      {course.map((course) => (
        <CheckoutBox
          key={course.id}
          courseId={course.id}
          image={`/assets/images/${course.thumbnail}`}
          productName={course.title}
          productdescript={`نگین زارع ــ مدرس دوره`}
          price={course.price.toLocaleString("fa-IR")}
          removeCourse={removeCourse}
        />
      ))}

      <div className={styles.receiptPart}>
        <div className={styles.textAndNumberCourse}>
          <span className={styles.text}> تعداد دوره ها</span>
          <span className={styles.numberCourse}> {summition.count} </span>
        </div>

        <div className={styles.totalPriceContainer}>
          <span className={styles.totalPriceText}> قیمت کل </span>
          <span className={styles.totalPrice}>
            {summition.sum} <i>تومان</i>
          </span>
        </div>
      </div>

      <button className={styles.payOff} onClick={handlePurchase}>
        پــرداخت
      </button>
    </div>
  );
};

export default CheckOut;
