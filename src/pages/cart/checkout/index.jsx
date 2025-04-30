import React, { useContext, useEffect, useState } from "react";
import styles from "./_checkout.module.scss";
import CourseData from "@/components/courseData";
import axios from "axios";
import BreadCrumb from "@/components/breadcrumb";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { base_url } from "@/api/url";
import { LoginContext } from "@/context/LoginContext";
import Head from "next/head";
import Loading from "@/components/loading";

const CheckOut = () => {
  const { token } = useContext(LoginContext);
  const router = useRouter();

  const [course, setCourse] = useState([]);
  const [summition, setSummition] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
      return;
    }

    const fetchData = async () => {
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

        setCourse(items);
        setSummition(response.data);
      } catch (error) {
        toast.warning(
          <div className="toast-container">
            <span className="toast-message"> لطفا مجددا وارد شوید! </span>
            <Link href="/login" className="toast-link">
              👈 ورود
            </Link>
          </div>,
          {
            position: "top-right",
            autoClose: 4000,
            theme: "colored",
            transition: Bounce,
          }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, router]);

  const handlePurchase = async () => {
    const handlePromise = new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${base_url}/order/create`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { orderId } = res.data;
        resolve(orderId);
      } catch (err) {
        reject(err);
      }
    });

    toast
      .promise(handlePromise, {
        pending: (
          <div style={{ fontFamily: "dana" }}>
            در حال انتقال به درگاه پرداخت...
          </div>
        ),
        success: (
          <div className="toast-container">انتقال به درگاه پرداخت 👌</div>
        ),
        error: (
          <div className="toast-container">عدم انتقال به درگاه پرداخت</div>
        ),
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

        const updatedCourses = course.filter(
          (course) => course.id !== courseId
        );
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
      } catch (err) {
        reject(err);
      }
    });

    toast.promise(handlePromise, {
      pending: <div style={{ fontFamily: "dana" }}>در حال حذف دوره...</div>,
      success: <div className="toast-container">دوره با موفقیت حذف شد 👌</div>,
      error: <div className="toast-container">خطا در حذف دوره</div>,
    });
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

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      <Head>
        <title>صفحه | تکمیل خرید 🛒</title>
      </Head>
      <ToastContainer rtl />
      {course.length > 0 ? (
        <>
          <BreadCrumb
            title={
              <>
                <Link
                  style={{ color: "#111", textDecoration: "none" }}
                  href={"/"}
                >
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
                <Link
                  style={{ color: "#111", textDecoration: "none" }}
                  href={"/cart"}
                >
                  سبد خرید
                </Link>{" "}
                /{" "}
              </>
            }
            currentHref={router.route}
            proceedTitle={"پرداخت"}
            handlePurchase={handlePurchase}
            show={true}
          />
          <div className={styles.list}>
            {course.map((course, index) => {
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
          {summition && (
            <div className={styles.receiptPart}>
              <div className={styles.textAndNumberCourse}>
                <span className={styles.text}> تعداد دوره ها </span>
                <span className={styles.numberCourse}> {summition.count} </span>
              </div>
              <div className={styles.totalPriceContainer}>
                <span className={styles.totalPriceText}> قیمت کل </span>
                <span className={styles.totalPrice}>
                  {course
                    .reduce(
                      (acc, curr) =>
                        acc +
                        calculateDiscountedPrice(
                          curr.price,
                          curr.discount_type,
                          curr.discount_value
                        ),
                      0
                    )
                    .toLocaleString("fa-IR")}
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
          <h1> سبد خرید شما خالی است! </h1>
          <Link href="/courses"> مشاهده دوره‌ها </Link>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
