"use client";

import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";

//Components
import OTP from "@/components/otp";

import Image from "next/image";

//Styles
import styles from "./_login.module.scss";

const schema = yup.object({
  phoneNumber: yup
    .string()
    .required("لطفا شماره تماس را وارد کنید")
    .matches(/[0-9]/, "شماره تماس را درست وارد کنید (انگلیسی)"),
  password: yup
    .string()
    .required("لطفا رمز عبور را وارد کنید")
    .min(8, "حداقل ۸ کاراکتر"),
});

const Login = () => {
  const url = "http://45.139.10.86/api";

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [authenticate, setAuthenticate] = useState(false);

  const [userData, setData] = useState({ phone: "", password: "" });

  const formSubmit = (data) => {
    setData({ phone: data.phoneNumber, password: data.password });

    axios
      .post(`${url}/login`, {
        phone: data.phoneNumber,
        password: data.password,
      })
      .then((response) => {
        setAuthenticate(true);
        console.log(response.data);
      })
      .catch((message) => console.error(message));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <Image
          width={100}
          height={100}
          src="/assets/images/phone-logo.png"
          alt="phone-logo"
          className={styles.logo}
          priority={true}
        />
        <div className={styles.imageAndContent}>
          <div className={styles.loginImage}>
            <Image width={450} height={600} src="/assets/images/intro_2.jpg" alt="model" />
          </div>
          <div className={styles.loginFormContainer}>
            {authenticate ? (
              <OTP userData={userData} />
            ) : (
              <form onSubmit={handleSubmit(formSubmit)}>
                <Input
                  className={styles.input}
                  id="phoneNumber"
                  type="text"
                  label="شماره تماس"
                  placeholder="شماره تلفون خود وارد کنید"
                  register={{ ...register("phoneNumber") }}
                />
                <span style={{ color: "#ff0000", fontFamily: "dana-light" }}>
                  {errors.phoneNumber?.message}
                </span>
                <Input
                  className={styles.input}
                  id="password"
                  type="password"
                  label="رمز عبور"
                  placeholder="********"
                  register={{ ...register("password") }}
                />
                <span style={{ color: "#ff0000", fontFamily: "dana-light" }}>
                  {errors.password?.message}
                </span>
                <div className={styles.btnFormContainer}>
                  <button type="submit"> درخواست کد </button>
                  <button type="reset"> لغو </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
