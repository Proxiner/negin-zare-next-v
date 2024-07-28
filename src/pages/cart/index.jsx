import React, { useEffect, useState, useContext } from "react";
import styles from "./_cart.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import useTitle from "@/hooks/useTitle";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseData from "@/components/courseData";
import BreadCrumb from "@/components/breadcrumb";
import { base_url } from "@/api/url";
import { LoginContext } from "@/context/LoginContext";

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);

  const { token } = useContext(LoginContext);

  useTitle("صفحه | سبد خرید 🛒");

  useEffect(() => {
    if (token) {
      console.log(token);
      const fetchData = async () => {
        try {
          const response = await axios.get(`${base_url}/cart/list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCartData(response.data.items);
        } catch (error) {
          toast.warning(
            <div className="toast-container">
              <span className="toast-message">
                {" "}
                لطفا وارد حساب خود شوید!{" "}
              </span>
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
          setLoggedIn(false)
        }
      };

      fetchData();
    }
  }, [token]);

  const removeCourse = async (courseId) => {
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

  const calculateDiscountedPrice = (price, discountType, discountValue) => {
    if (discountType === "percent" && discountValue) {
      return price - (price * discountValue) / 100;
    }
    return price;
  };

  const router = useRouter();

  if (cartData === null) {
    return (
      <div className={styles.notify}>
        <h1>در حال بارگذاری سبد خرید شما...</h1>
      </div>
    );
  }

  if (loggedIn) {
    return (
      <div className={styles.container}>
        <BreadCrumb
          title={
            <>
              <Link
                style={{ color: "#111", textDecoration: "none" }}
                href={"/"}
              >
                خانه
              </Link>
              /
              <Link
                style={{ color: "#111", textDecoration: "none" }}
                href={"/courses"}
              >
                دوره ها
              </Link>
              /
              <Link
                style={{ color: "#111", textDecoration: "none" }}
                href={"/cart"}
              >
                سبد خرید
              </Link>
              /
            </>
          }
          currentHref={router.route}
          proceedTitle={"مرحله بعد"}
          hrefProceed={"/cart"}
        />
        <div className={styles.notify}>
          <h1> هیچ دوره های رو به سبد خرید اضافه نکردید! </h1>
          <Link href={"/courses"}> صفحه دوره ها </Link>
        </div>
      </div>
    );
  }else{
    return (
      <div className={styles.notify}>
        <h1> لطفا وارد حساب خود شوید! </h1>
        <Link href={'/login'}> صفحه ورود </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BreadCrumb
        title={
          <>
            <Link style={{ color: "#111", textDecoration: "none" }} href={"/"}>
              خانه
            </Link>
            /
            <Link
              style={{ color: "#111", textDecoration: "none" }}
              href={"/courses"}
            >
              دوره ها
            </Link>
            /
            <Link
              style={{ color: "#111", textDecoration: "none" }}
              href={"/cart"}
            >
              سبد خرید
            </Link>
            /
          </>
        }
        currentHref={router.route}
        proceedTitle={"مرحله بعد"}
        hrefProceed={"/cart/checkout"}
        show={true}
      />
      <ToastContainer rtl />
      <div className={styles.list}>
        {cartData.map((course, index) => {
          const discountedPrice = calculateDiscountedPrice(
            course.price,
            course.discount_type,
            course.discount_value
          );
          const hasDiscount =
            course.discount_type === "percent" && course.discount_value;

          return (
            <React.Fragment key={`course-${course.id}`}>
              <CourseData
                courseId={course.id}
                title={course.title}
                teacher={course.teacher.name}
                imageSrc={`/assets/images/${course.thumbnail}`}
                type={course.type}
                price={
                  hasDiscount ? (
                    <span>
                      <span className={styles.originalPrice}>
                        {course.price.toLocaleString("fa-IR")} تومان
                      </span>{" "}
                      | با تخفیف :
                      <span className={styles.discountedPrice}>
                        {discountedPrice.toLocaleString("fa-IR")}
                      </span>
                    </span>
                  ) : (
                    `${course.price.toLocaleString("fa-IR")}`
                  )
                }
                removeCourse={removeCourse}
              />
              <div key={`line-${index}`} className={styles.line}></div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
