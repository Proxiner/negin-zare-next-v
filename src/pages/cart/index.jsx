import React, { useEffect, useState } from "react";
import styles from "./_cart.module.scss";
import useTitle from "@/hooks/useTitle";
import axios from "axios";

import PopMessage from "@/components/popMessage";

function Cart() {
  useTitle("نگین | سبد خرید 💄");

  const url = "http://45.139.10.86:8080/api";

  const [token, setToken] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem("token")?.replace(/"/g, "");

    if (storedToken) {
      setToken(storedToken);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/cart/list`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          setMessage("login-required");
        }
      }
    };

    if (storedToken) {
      fetchData();
    }
  }, []);

  return (
    <div className={styles.container}>
      {message === "login-required" && (
        <PopMessage
          message="برای خرید باید وارد شوید"
          again="منو ببر به ورود"
          imageSrc={"/assets/icons/thumbs-down.gif"}
        />
      )}
    </div>
  );
}

export default Cart;
