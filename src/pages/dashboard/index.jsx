import React, { useEffect, useState } from "react";

import { FaHome } from "react-icons/fa";
import { PiPaintBrushDuotone } from "react-icons/pi";
import { FaUserTag } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

import axios from "axios";

import styles from "./_dashboard.module.scss";
import { useRouter } from "next/router";

const Index = () => {
  const url = "http://45.139.10.86/api";

  const router = useRouter();
  const { token } = router.query;

  // const token = window.localStorage.getItem('token');

  const [userCredentials, setCredentials] = useState({});


  useEffect(() => {

    console.log(token);

    axios.get(`${url}/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCredentials(response.data);
      })
      .catch((message) => {
        console.error(message);
      });
  },[token]);

  const logout = () => {
    // window.localStorage.removeItem('token');
  };

  const {id,name,email,phone} = userCredentials;

  return (
    <div className={styles.container}>
      <h3> {name} عزیز </h3>
        <ul>
            <li>{id}</li>
            <li>{email}</li>
            <li>{phone}</li>
        </ul>
      <ul>
        <li>
          <FaHome color="#fff" fontSize="1.5rem" /> حساب کاربری
        </li>
        <li>
          <PiPaintBrushDuotone color="#fff" fontSize="1.5rem" /> دوره های من
        </li>
        <li>
          <FaUserTag color="#fff" fontSize="1.5rem" /> کد های لایسنس
        </li>
        <li onClick={logout}>
          <IoIosLogOut color="red" fontSize="1.5rem" /> خروج{" "}
        </li>
      </ul>
    </div>
  );
};

export default Index;
