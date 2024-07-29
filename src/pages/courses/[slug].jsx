import React, { useEffect, useState, useContext } from "react";
import styles from "./_courseHeader.module.scss";
import CourseDetails from "./courseDetails";
import Image from "next/image";
import axios from "axios";
import useStripHtml from "@/hooks/useStripHtml";
import useTitle from "@/hooks/useTitle";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { base_url } from "@/api/url";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartContext } from "@/context/CartContext"; // Import CartContext

const CourseDetail = ({ course }) => {
  const router = useRouter();
  const stripHtml = useStripHtml();
  useTitle(`دوره ${course?.title || ""}`);

  const [exist, setExist] = useState(false);
  const [token, setToken] = useState();

  const { setCartLength } = useContext(CartContext); // Use CartContext

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      toast.info(
        <div className="toast-container">
          <span className="toast-message">
            {" "}
            برای خرید دوره باید وارد حساب خود شوید!{" "}
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
          theme: "light",
          transition: Bounce,
        }
      );
    } else {
      const retrieveToken = localStorage.getItem("token")?.replace(/"/g, "");
      setToken(retrieveToken);
    }
  }, [token]);

  useEffect(() => {
    if (token && course) {
      const cartList = async () => {
        try {
          const response = await axios.get(`${base_url}/cart/list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data.items;
          const listCourses = data.map((item) => item.slug);
          const courseSlug = listCourses.find((slug) => slug === course.slug);
          console.log(response)

          if (courseSlug === course.slug) {
            setExist(true);
          }
        } catch (error) {
          console.error(error.message);
        }
      };

      cartList();
    }
  }, [token, course]);

  const addCourse = async () => {
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
      const data = response.data.status;
      setExist(data);

      // Fetch the updated cart list to get the new length
      const cartResponse = await axios.get(`${base_url}/cart/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newCartLength = cartResponse.data.items.length;
      setCartLength(newCartLength); // Update the cart length in the context
    } catch (error) {
      toast.warning(
        <div className="toast-container">
          <span className="toast-message">
            {" "}
            برای خرید دوره باید وارد حساب خود شوید!{" "}
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
          theme: "light",
          transition: Bounce,
        }
      );
    }
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>Error: Course not found</div>;
  }

  return (
    <>
      <ToastContainer rtl toastClassName={styles.toast} />
      <div className={styles.container}>
        <div className={styles.information}>
          <header>
            <h2>{stripHtml(course.headline)}</h2>
            <p>{stripHtml(course.body)}</p>
          </header>
          <section>
            <CourseDetails
              price={course.price.toLocaleString("fa-IR")}
              hours="۱ ساعت آموزش"
              sessions={`${course.number_of_session} جلسه`}
              instructor={course.teacher.name}
              type={course.type}
            />
            {exist ? (
              <button
                className={styles.remove}
                onClick={() => router.push("/cart")}
              >
                ادامه خرید دوره
                <FaArrowLeftLong />
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
            src={`/assets/images/${course.thumbnail}`}
            alt="course image"
          />
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  try {
    const response = await axios.get(`${base_url}/products`);
    const courses = response.data;
    const paths = courses.map((course) => ({
      params: { slug: course.slug },
    }));

    return { paths, fallback: true };
  } catch (error) {
    console.error(error);
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps({ params }) {
  try {
    const response = await axios.get(`${base_url}/product/${params.slug}`);
    const course = response.data;

    if (!course) {
      return {
        notFound: true,
      };
    }

    return { props: { course } };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export default CourseDetail;