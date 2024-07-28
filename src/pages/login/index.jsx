"use client";

import React, { useState } from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import axios from "axios";

import Link from "next/link";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Components
import OTP from "@/components/otp";

import Image from "next/image";

//Styles
import styles from "./_login.module.scss";
import useTitle from "@/hooks/useTitle";
import { base_url } from "@/api/url";

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
  useTitle("نگین | ورود 💄");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [authenticate, setAuthenticate] = useState(false);

  const [showPass, setShowPass] = useState(true);

  const [userData, setData] = useState({ phone: "", password: "" });

  const formSubmit = (data) => {
    setData({ phone: data.phoneNumber, password: data.password });

    axios
      .post(`${base_url}/login`, {
        phone: data.phoneNumber,
        password: data.password,
      })
      .then(() => {
        setAuthenticate(true);
      })
      .catch((error) => {
        console.error(error.message);
        toast.error(
          <div className="toast-container">
            <span className="toast-message">
              رمز عبور یا شماره همراه رو اشتباه وارد کردید!
            </span>
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
            transition: Slide,
          }
        );
      });
  };

  return (
    <div className={styles.loginContainer}>
      <ToastContainer rtl />

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
          <Image
            width={450}
            height={600}
            src="/assets/images/intro_2.jpg"
            alt="model"
          />
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
              <div className={styles.password}>
                <Input
                  className={styles.input}
                  id="password"
                  type={showPass ? "password" : "text"}
                  label="رمز عبور"
                  placeholder="********"
                  register={{ ...register("password") }}
                />
                {showPass ? (
                  <AiOutlineEyeInvisible
                    className={styles.eye}
                    onClick={() => setShowPass(!showPass)}
                  />
                ) : (
                  <AiOutlineEye
                    className={styles.eye}
                    onClick={() => setShowPass(!showPass)}
                  />
                )}
              </div>
              <span style={{ color: "#ff0000", fontFamily: "dana-light" }}>
                {errors.password?.message}
              </span>
              <div className={styles.btnFormContainer}>
                <div className={styles.btns}>
                  <button type="submit"> درخواست کد </button>
                  <button type="reset"> لغو </button>
                </div>
                <Link href="/register">حساب کاربری نداری؟ ساخت حساب</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
