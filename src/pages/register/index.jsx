"use client";
import React, { useState } from "react";

import PopMessage from "@/components/popMessage";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import Input from "../../components/Input";

import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Image from "next/image";

//Styles
import styles from "./_register.module.scss";

const schema = yup.object({
  username: yup.string().required("لطفا نام کامل خود را وارد کنید"),
  phoneNumber: yup
    .string()
    .required("لطفا شماره تماس را وارد کنید")
    .matches(/[0-9]/, "شماره تماس را درست وارد کنید (انگلیسی)"),
  email: yup.string().required("لطفا ایمیل خود را وارد کنید"),
  password: yup
    .string()
    .required("لطفا رمز عبور را وارد کنید")
    .min(8, "حداقل ۸ کاراکتر"),
  confrimPassword: yup
    .string()
    .oneOf([yup.ref("password")], "رمز عبور یکسان نیست"),
});

const Login = () => {
  const url = "http://45.139.10.86/api";

  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = (data) => {
    axios
      .post(`${url}/register`, {
        name: data.username,
        phone: data.phoneNumber,
        password: data.password,
        email: data.email,
      })
      .then((response) => {
        if (response.data.message === "User before exist") {
          setMessage("userExist");
        } else {
          setMessage("success");
        }
      })
      .catch(() => setMessage("failed"));
  };

  const [showPass, setShowPass] = useState(true);

  return (
    <div className={styles.wrapper}>
      {message === "success" ? (
        <PopMessage
          message="حساب کاربری با موفقیت ساخته شد :)"
          imageSrc={"/assets/icons/thumbs-up.gif"}
          tryAgain="انتقال خودکار در"
        />
      ) : message === "failed" ? (
        <PopMessage
          message="متاسفانه حساب کاربری ایجاد نشد :("
          imageSrc={"/assets/icons/thumbs-down.gif"}
          tryAgain="امتحان مجدد در"
        />
      ) : message === "userExist" ? (
        <PopMessage
          message="این حساب کاربری قبلا ایجاد شده است :("
          imageSrc={"/assets/icons/warning.svg"}
          again="لطفا وارد شوید"
        />
      ) : (
        ""
      )}
      <div className={styles.loginContainer}>
        <Image
          width={100}
          height={100}
          src="/assets/images/phone-logo.png"
          alt="logo"
          priority={true}
        />

        <div className={styles.imageAndContent}>
          <div className={styles.loginImage}>
            <Image
              width={450}
              height={600}
              src="/assets/images/register.jpg"
              alt="image model"
            />
          </div>
          <div className={styles.loginFormContainer}>
            <form onSubmit={handleSubmit(formSubmit)}>
              <Input
                id="userName"
                type="text"
                label="نام و نام خانوادگی"
                placeholder="اسم کامل خود را وارد کنید"
                register={{ ...register("username") }}
              />
              <span style={{ color: "#ff0000", fontFamily: "dana-light" }}>
                {errors.username?.message}{" "}
              </span>
              <Input
                id="phoneNumber"
                type="text"
                label="شماره تماس"
                placeholder="شماره تلفون خود وارد کنید"
                register={{ ...register("phoneNumber") }}
              />
              <span style={{ color: "#ff0000", fontFamily: "dana-light" }}>
                {errors.phoneNumber?.message}{" "}
              </span>
              <Input
                id="email"
                type="email"
                label="ایمیل"
                placeholder="ایمیل خود را وارد کنید"
                register={{ ...register("email") }}
              />
              <span style={{ color: "#ff0000", fontFamily: "dana-light" }}>
                {errors.email?.message}
              </span>
              <div className={styles.passwordConatiner}>
                <div className={styles.password}>
                  <Input
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

                <div className={styles.repeatPassword}>
                  <Input
                    id="confrimPassword"
                    type={showPass ? "password" : "text"}
                    label="تکرار رمزعبور"
                    placeholder="********"
                    register={{ ...register("confrimPassword") }}
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
              </div>
              <span style={{ color: "#ff0000", fontFamily: "dana-light" }}>
                {errors.password?.message}
              </span>
              <span style={{ color: "#ff0000", fontFamily: "dana-light" }}>
                {errors.confrimPassword?.message}
              </span>

              <div className={styles.btnFormContainer}>
                <button type="submit"> ثبت نام </button>
                <button type="reset"> لغو </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
