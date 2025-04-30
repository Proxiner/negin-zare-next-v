import React, { useEffect, useState, useContext } from "react";
import styles from "./_courseHeader.module.scss";
import CourseDetails from "./courseDetails";
import Image from "next/image";
import useStripHtml from "@/hooks/useStripHtml";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartContext } from "@/context/CartContext";
import axios from "axios";
import { base_url } from "@/api/url";
import NotifyIphoneUsers from "@/components/notifyIphoneUsers";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";

const fetchCourse = async (slug) => {
  const res = await axios.get(`${base_url}/product/${slug}`);
  return res.data;
};

const CourseDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const stripHtml = useStripHtml();
  const [courseDiscountPrice, setCourseDiscountPrice] = useState(null);
  const [exist, setExist] = useState(false);
  const [token, setToken] = useState(null);
  const [discountState, setDiscountState] = useState(false);
  const { setCartLength } = useContext(CartContext);

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => fetchCourse(slug),
    enabled: !!slug, // wait until slug is available
  });

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      toast.info(
        <div className="toast-container">
          <span className="toast-message">
            برای خرید دوره باید وارد حساب خود شوید!
          </span>
          <Link href="/login" className="toast-link">
            👈 صفحه ورود
          </Link>
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
          transition: Bounce,
          theme: "light",
        }
      );
    } else {
      const retrieveToken = localStorage.getItem("token")?.replace(/"/g, "");
      setToken(retrieveToken);
    }
  }, []);

  useEffect(() => {
    if (course) {
      let discountPrice;
      switch (course.discount_type) {
        case "percent":
          discountPrice =
            course.price - course.price * (course.discount_value / 100);
          setDiscountState(true);
          break;
        case "static":
          discountPrice = course.price - course.discount_value;
          setDiscountState(true);
          break;
        default:
          discountPrice = course.price;
          setDiscountState(false);
          break;
      }
      setCourseDiscountPrice(discountPrice.toLocaleString("fa-IR"));
    }
  }, [course]);

  useEffect(() => {
    const checkCourseInCart = async () => {
      if (token && course) {
        try {
          const cartResponse = await axios.get(`${base_url}/cart/list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const existsInCart = cartResponse.data.items.some(
            (item) => item.id === course.id
          );
          setExist(existsInCart);
        } catch (error) {
          console.warn("Error checking cart contents:", error);
        }
      }
    };

    checkCourseInCart();
  }, [token, course]);

  const addCourse = async () => {
    if (!token) {
      toast.info(
        <div className="toast-container">
          <span className="toast-message">
            برای خرید دوره باید وارد حساب خود شوید!
          </span>
          <Link href="/login" className="toast-link">
            👈 صفحه ورود
          </Link>
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
          transition: Bounce,
          theme: "light",
        }
      );
      return;
    }

    try {
      const response = await axios.post(
        `${base_url}/cart/add`,
        { productId: course.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "شما قبلا این دوره را خریداری کرده اید") {
        toast.error(
          <div className="toast-container">
            <span className="toast-message">
              شما قبلا دوره را خریداری کرده اید!
              <Link href={"/dashboard"}> دوره‌های من </Link>
            </span>
          </div>,
          {
            position: "top-right",
            autoClose: 4000,
            theme: "light",
            transition: Bounce,
          }
        );
      }

      setExist(true);

      const cartResponse = await axios.get(`${base_url}/cart/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newCartLength = cartResponse.data.items.length;
      setCartLength(newCartLength);
    } catch (error) {
      toast.warning(
        <div className="toast-container">
          <span className="toast-message">
            مشکلی در اضافه کردن دوره به سبد خرید به وجود آمد.
          </span>
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
          transition: Bounce,
          theme: "light",
        }
      );
    }
  };

  if (isLoading || router.isFallback) {
    return <Loading />;
  }

  if (isError || !course) {
    return <div className={styles.error}>خطا: دوره مورد نظر پیدا نشد.</div>;
  }

  return (
    <>
      <Head>
        <title>دوره {course?.title || ""}</title>
      </Head>
      <ToastContainer rtl toastClassName={styles.toast} />
      <div className={styles.container}>
        <div className={styles.information}>
          <header>
            <h2>{stripHtml(course.headline)}</h2>
            <p>{stripHtml(course.body)}</p>
          </header>
          <section>
            <CourseDetails
              price={courseDiscountPrice}
              sessions={`${course.number_of_session} جلسه`}
              instructor={course.teacher.name}
              type={course.type}
              hasDiscount={discountState}
            />
            {exist ? (
              <button
                className={styles.remove}
                onClick={() => router.push("/cart")}
              >
                ادامه خرید دوره <FaArrowLeftLong />
              </button>
            ) : (
              <button className={styles.buy} onClick={addCourse}>
                <Image
                  width={30}
                  height={30}
                  src={"/assets/icons/add.svg"}
                  alt="add-to-cart"
                />
                افزودن به سبد خرید
              </button>
            )}
          </section>
        </div>
        <div className={styles.courseModel}>
          <Image
            width={400}
            height={600}
            src={`http://neginzare.com:8080/storage/${course.thumbnail}`}
            alt="course image"
            onError={(e) => (e.target.src = "/assets/images/placeholder.png")}
          />
        </div>
      </div>
      <NotifyIphoneUsers />
    </>
  );
};

export default CourseDetail;
