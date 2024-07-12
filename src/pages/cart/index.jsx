import React, { useEffect, useState } from "react";
import styles from "./_cart.module.scss";

import Link from "next/link";
import axios from "axios";

import useTitle from "@/hooks/useTitle";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseData from "@/components/courseData";

function Cart() {
  const url = "http://45.139.10.86:8080/api";
  const [token, setToken] = useState();
  const [cartData, setCartData] = useState([]);

  useTitle("صفحه | سبد خرید 🛒");

  useEffect(() => {
    const storedToken = localStorage.getItem("token")?.replace(/"/g, "");
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/cart/list`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setCartData(response.data.items);
        console.log(response.data.items);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.info(
            <>
              <span className="message"> لطفا وارد حساب کاربری خود شوید! </span>
              <Link href="/dashboard" className="redirect">
                👈 حساب کاربری
              </Link>
            </>,
            {
              position: "top-right",
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
      setToken(storedToken);
      fetchData();
    }
  }, []);

  return (
    <div className={styles.container}>
      <ToastContainer rtl toastClassName={styles.toast} />
      {cartData.map((course) => (
        <CourseData
          key={course.id}
          title={course.title}
          imageSrc={`/assets/images/${course.thumbnail}`}
          type={course.type}
          price={course.price}
        />
      ))}
    </div>
  );
}

export default Cart;
