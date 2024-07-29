import React, { useContext, useEffect, useState } from "react";
import styles from "./_checkout.module.scss";
import CourseData from "@/components/courseData";
import axios from "axios";
import useTitle from "@/hooks/useTitle";
import BreadCrumb from "@/components/breadcrumb";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { base_url } from "@/api/url";
import { LoginContext } from "@/context/LoginContext";

const CheckOut = () => {
  const { token } = useContext(LoginContext);

  useTitle("صفحه | تکمیل خرید 🛒");

  const router = useRouter();

  const [course, setCourse] = useState([]);
  const [summition, setSummition] = useState(null);
  const [purchaseID, setPurchaseID] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${base_url}/cart/list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCourse(response.data.items);
          setSummition(response.data);
        } catch (error) {
          if (error.response?.status === 401) {
            toast.info(
              <div className="toast-container">
                <span className="toast-message">
                  {" "}
                  لطفا وارد حساب کاربری خود شوید!{" "}
                </span>
                <Link href="/login" className="toast-link">
                  👈 حساب کاربری
                </Link>
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
        }
      };
      fetchData();
    }
  }, [token]);

  const handlePurchase = async () => {
    const handlePromise = new Promise(async (resolve, reject) => {
      try {
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
        resolve(response.orderId);
      } catch (error) {
        reject(error);
      }
    });

    toast
      .promise(handlePromise, {
        pending: {
          render() {
            return (
              <div style={{ fontFamily: "dana" }}>
                در حال انتقال به درگاه پرداخت...
              </div>
            );
          },
        },
        success: {
          render() {
            return (
              <div className="toast-container">انتقال به درگاه پرداخت 👌</div>
            );
          },
        },
        error: {
          render() {
            return (
              <div className="toast-container">عدم انتقال به درگاه پرداخت</div>
            );
          },
        },
      })
      .then((orderId) => {
        router.push(`${base_url}/purchase/${orderId}`);
      });
  };

  const removeCourse = async (courseId) => {
    const handlePromise = new Promise(async (resolve, reject) => {
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
        const updatedCourses = course.filter((course) => course.id !== courseId);
        setCourse(updatedCourses);
  
        if (updatedCourses.length === 0) {
          router.push("/courses");
        } else {
          const updatedSummition = {
            ...summition,
            count: updatedCourses.length,
            sum: updatedCourses.reduce((acc, curr) => {
              const discountedPrice = calculateDiscountedPrice(
                curr.price,
                curr.discount_type,
                curr.discount_value
              );
              return acc + discountedPrice;
            }, 0),
          };
          setSummition(updatedSummition);
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  
    toast.promise(handlePromise, {
      pending: {
        render() {
          return <div style={{ fontFamily: "dana" }}>در حال حذف دوره...</div>;
        },
      },
      success: {
        render() {
          return <div className="toast-container">دوره با موفقیت حذف شد 👌</div>;
        },
      },
      error: {
        render() {
          return <div className="toast-container">خطا در حذف دوره</div>;
        },
      },
    });
  };

  const calculateDiscountedPrice = (price, discountType, discountValue) => {
    if (discountType === "percent" && discountValue) {
      return price - (price * discountValue) / 100;
    }
    return price;
  };

  return (
    <div className={styles.container}>
      {course.length > 0 ? (
        <>
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
            proceedTitle={"پرداخت"}
            handlePurchase={handlePurchase}
            show={true}
          />
          <ToastContainer rtl />
          <div className={styles.list}>
            {course.map((course, index) => {
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
                    imageSrc={
                      course.thumbnail
                        ? `/assets/images/${course.thumbnail}`
                        : "/assets/images/intro_3.jpg"
                    }
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
          {summition && (
            <div className={styles.receiptPart}>
              <div className={styles.textAndNumberCourse}>
                <span className={styles.text}> تعداد دوره ها</span>
                <span className={styles.numberCourse}> {summition.count} </span>
              </div>

              <div className={styles.totalPriceContainer}>
                <span className={styles.totalPriceText}> قیمت کل </span>
                <span className={styles.totalPrice}>
                  {summition.sum.toLocaleString("fa-IR")} <i>تومان</i>
                </span>
              </div>

              <div className={styles.purchaseContainer}>
                <button className={styles.payOff} onClick={handlePurchase}>
                  پــرداخت
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.notify}>
          <h1> سبد خرید شما خالی هست! </h1>
          <Link href={'/courses'}> مشاهده دوره ها </Link>
        </div>
      )}
    </div>
  );
};

export default CheckOut;