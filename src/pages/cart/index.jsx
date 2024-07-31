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
  const [cartData, setCartData] = useState("empty");
  const [isLogged, setIsLogged] = useState("");
  const [cartLength, setCartLength] = useState();

  const { token } = useContext(LoginContext);

  useTitle("صفحه | سبد خرید 🛒");

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
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
    setIsLogged("not-logged-in");
  }, [token]);

  useEffect(() => {
    if (token) {
      const fetchCartList = async () => {
        try {
          const response = await axios.get(`${base_url}/cart/list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCartData(response.data.items);
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
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            }
          );
          setIsLogged("not-logged-in");
        }
      };
      fetchCartList();
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

  // useEffect(() => {
  //   if (token) {
  //     axios
  //       .get(`${base_url}/cart/list`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((request) => {
  //         console.log(request)
  //         if (request.status === 401) {
  //           toast.warning(
  //             <div className="toast-container">
  //               <span className="toast-message">
  //                 {" "}
  //                 لطفا وارد حساب خود شوید!{" "}
  //               </span>
  //               <Link href="/login" className="toast-link">
  //                 👈 صفحه ورود
  //               </Link>
  //             </div>,
  //             {
  //               position: "top-right",
  //               autoClose: 4000,
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //               theme: "colored",
  //               transition: Bounce,
  //             }
  //           );
  //           setIsLogged("not-logged-in");
  //         }else{
  //           setCartLength(request.data.items.length);
  //         }
  //       });
  //   }
  // }, [removeCourse, token]);

  const calculateDiscountedPrice = (price, discountType, discountValue) => {
    if (discountType === "percent" && discountValue) {
      return price - (price * discountValue) / 100;
    }
    if (discountType === "static" && discountValue) {
      return price - discountValue;
    }
    return price;
  };

  const router = useRouter();

  if (cartLength == 0) {
    return (
      <div className={styles.notify}>
        <ToastContainer rtl />
        <h1> سبد خرید شما خالی هست :( </h1>
        <Link href={"/courses"}> مشاهده دوره ها </Link>
      </div>
    );
  }

  switch (isLogged) {
    case "logged-in":
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
                    imageSrc={`/assets/images/${course.thumbnail}`}
                    type={course.type}
                    price={
                      hasDiscount ? (
                        <span>
                          <span className={styles.originalPrice}>
                            {course.price.toLocaleString('fa-IR')} تومان
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

    case "not-logged-in":
      return (
        <div className={styles.notify}>
          <h1> لطفا مجددا وارد حساب خود شوید! </h1>
          <Link href={"/login"}> صفحه ورود به حساب </Link>
        </div>
      );

    default:
      return null;
  }
}

export default Cart;
