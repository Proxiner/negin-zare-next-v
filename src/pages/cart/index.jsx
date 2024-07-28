import React, { useEffect, useState } from "react";
import styles from "./_cart.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import useTitle from "@/hooks/useTitle";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import CourseData from "@/components/courseData";
import BreadCrumb from "@/components/breadcrumb";
import { base_url } from "@/api/url";

function Cart() {
  const [token, setToken] = useState();
  const [cartData, setCartData] = useState([]);
  const [proceedLink , setProceedLink] = useState();

  useTitle("صفحه | سبد خرید 🛒");

  useEffect(() => {
    const storedToken = localStorage.getItem("token")?.replace(/"/g, "");
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/cart/list`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setCartData(response.data.items);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.warning(
            <div className="toast-container">
              <span className="toast-message"> لطفا وارد حساب خود شوید! </span>
              <Link href="/login" className="toast-link">
                👈 صفحه ورود
              </Link>
            </div>,
            {
              position: "top-right",
              autoClose: 4000,
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
      setToken(storedToken);
      fetchData();
    }
  }, []);

  const removeCourse = async (courseId) => {
    console.log(courseId);
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
      setCartData(cartData.filter((course) => course.id !== courseId));
    } catch (error) {
      toast.error(
        <div className="toast-container">
          <span className="toast-message"> خطا در حذف دوره! </span>
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
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

  const router = useRouter();

  if (!cartData.length) {
    return (
      <div className={styles.container}>
        <BreadCrumb
          title={
            <>
              <Link
                style={{ color: "#111", textDecoration: "none" }}
                href={"/"}
              >
                {" "}
                خانه{" "}
              </Link>
              /
              <Link
                style={{ color: "#111", textDecoration: "none" }}
                href={"/courses"}
              >
                {" "}
                دوره ها{" "}
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
            </>
          }
          currentHref={router.route}
          proceedTitle={"مرحله بعد"}
          hrefProceed={"/cart"}
          proceedIcon={<FaArrowLeftLong />}
        />
        <div className={styles.notify}>
          <h1> هیچ دوره های رو به سبد خرید اضافه نکردید! </h1>
          <Link href={'/courses'}> صفحه دوره ها </Link>
        </div>
      </div>
    );
  }

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
              href={"/courses"}
            >
              {" "}
              دوره ها{" "}
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
          </>
        }
        currentHref={router.route}
        proceedTitle={"مرحله بعد"}
        hrefProceed={"/cart/checkout"}
        proceedIcon={<FaArrowLeftLong />}
      />
      <ToastContainer rtl />
      <div className={styles.list}>
        {cartData.map((course) => (
          <CourseData
            key={course.id}
            courseId={course.id}
            title={course.title}
            teacher="مدرس"
            imageSrc={`/assets/images/${course.thumbnail}`}
            type={course.type}
            price={course.price}
            removeCourse={removeCourse}
          />
        ))}
      </div>
    </div>
  );
}

export default Cart;
