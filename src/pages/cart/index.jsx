import React, { useEffect, useState, useContext } from "react";
import styles from "./_cart.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseData from "@/components/courseData";
import BreadCrumb from "@/components/breadcrumb";
import { base_url } from "@/api/url";
import { LoginContext } from "@/context/LoginContext";
import NotifyIphoneUsers from "@/components/notifyIphoneUsers";
import Loading from "@/components/loading";
import Head from "next/head";

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [isLogged, setIsLogged] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useContext(LoginContext);
  const router = useRouter();

  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (!localToken) {
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
          theme: "colored",
          transition: Bounce,
        }
      );
      setIsLogged("not-logged-in");
      setLoading(false);
      return;
    }

    const fetchCartList = async () => {
      try {
        const response = await axios.get(`${base_url}/cart/list`, {
          headers: {
            Authorization: `Bearer ${localToken.replace(/"/g, "")}`,
          },
        });

        const items = response.data.items;
        if (!items || items.length === 0) {
          router.push("/courses");
          return;
        }

        setCartData(items);
        setIsLogged("logged-in");
      } catch (error) {
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
            theme: "colored",
            transition: Bounce,
          }
        );
        setIsLogged("not-logged-in");
      } finally {
        setLoading(false);
      }
    };

    fetchCartList();
  }, [token, router]);

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

      const updatedCart = cartData.filter((course) => course.id !== courseId);
      setCartData(updatedCart);

      if (updatedCart.length === 0) {
        router.push("/courses");
      }
    } catch (error) {
      toast.error(
        <div className="toast-container">
          <span className="toast-message"> خطا در حذف دوره! </span>
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
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
    if (discountType === "static" && discountValue) {
      return price - discountValue;
    }
    return price;
  };

  if (loading) {
    return <Loading />;
  }

  if (isLogged === "not-logged-in") {
    return (
      <div className={styles.notify}>
        <ToastContainer rtl />
        <h1> لطفا مجددا وارد حساب خود شوید! </h1>
        <Link href={"/login"}> صفحه ورود به حساب </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>صفحه | سبد خرید 🛒</title>
      </Head>
      <BreadCrumb
        title={
          <>
            <Link style={{ color: "#111", textDecoration: "none" }} href={"/"}>
              خانه
            </Link>{" "}
            /{" "}
            <Link
              style={{ color: "#111", textDecoration: "none" }}
              href={"/courses"}
            >
              دوره ها
            </Link>{" "}
            /{" "}
          </>
        }
        currentHref={router.route}
        proceedTitle={"مرحله بعد"}
        hrefProceed={"/cart/checkout"}
        show={false}
      />
      <ToastContainer rtl />
      <div className={styles.list}>
        {cartData.map((course, index) => {
          const discountedPrice = calculateDiscountedPrice(
            course.price,
            course.discount_type,
            course.discount_value
          );
          const hasDiscount = course.discount_type !== null;

          return (
            <React.Fragment key={`course-${course.id}`}>
              <CourseData
                courseId={course.id}
                title={course.title}
                teacher={course.teacher.name}
                imageSrc={`http://neginzare.com:8080/storage/${course.thumbnail}`}
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
      <NotifyIphoneUsers />
    </div>
  );
}

export default Cart;
