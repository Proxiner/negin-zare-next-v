"use client";
import React, { useState, useEffect } from "react";

import PopMessage from "@/components/popMessage";

import Input from "../../components/Input";

import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Image from "next/image";

import WindowsImage from "@/components/windowsImage";

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
        username: data.username,
        phone: data.phoneNumber,
        password: data.password,
        email: data.email,
      })
      .then(() => setMessage("succses"))
      .catch(() => setMessage("failed"));
  };

  const [windowImageProps, setWindowImageProps] = useState({
    current: {
      imageWidthContainer: 450,
      imageHeightContainer: 630,
      imageWidth: 100,
      imageHeight: 100,
      beforeWidth: 450,
      beforeHeight: 630,
      beforeTop: 15,
      beforeRight: -20,
      imageRadius: "0px 0px 0px 0px",
      beforeBorderRadius: "0px 0px 0px 0px",
      beforeBorder: "1px solid #fff",
    },

    laptop: {
      imageWidthContainer: 430,
      imageHeightContainer: 600,
      imageWidth: 100,
      imageHeight: 100,
      beforeWidth: 430,
      beforeHeight: 600,
      beforeTop: 15,
      beforeRight: -20,
      imageRadius: "0px 0px 0px 0px",
      beforeBorderRadius: "0px 0px 0px 0px",
      beforeBorder: "1px solid #fff",
    },

    tabletLandscape: {
      imageWidthContainer: 310,
      imageHeightContainer: 430,
      imageWidth: 100,
      imageHeight: 100,
      beforeWidth: 310,
      beforeHeight: 430,
      beforeTop: 15,
      beforeRight: -15,
      imageRadius: "0px 0px 0px 0px",
      beforeBorderRadius: "0px 0px 0px 0px",
      beforeBorder: "1px solid #fff",
    },

    tabletPortrait: {
      imageWidthContainer: 250,
      imageHeightContainer: 320,
      imageWidth: 100,
      imageHeight: 100,
      beforeWidth: 250,
      beforeHeight: 320,
      beforeTop: 15,
      beforeRight: 10,
      imageRadius: "120px 120px 0px 0px",
      beforeBorderRadius: "77.5px 77.5px 0px 0px",
      beforeBorder: "1px solid #fff",
    },

    phone: {
      imageWidthContainer: 250,
      imageHeightContainer: 320,
      imageWidth: 100,
      imageHeight: 100,
      beforeWidth: 250,
      beforeHeight: 320,
      beforeTop: 15,
      beforeRight: 10,
      imageRadius: "120px 120px 0px 0px",
      beforeBorderRadius: "0px 0px 0px 0px",
      beforeBorder: "1px solid #fff",
    },
  });

  useEffect(() => {
    const handleResize = () => {
      if (matchMedia("(min-width: 1366px) and (max-width: 1440px)").matches) {
        setWindowImageProps((prevState) => ({
          ...prevState,
          current: prevState.laptop,
        }));
      } else if (
        matchMedia(
          "(min-width: 1024px) and (max-width: 1365px) and (orientation : landscape)"
        ).matches
      ) {
        setWindowImageProps((prevState) => ({
          ...prevState,
          current: prevState.tabletLandscape,
        }));
      } else if (
        matchMedia(
          "(min-width: 768px) and (max-width: 1024px) and (orientation : portrait)"
        ).matches
      ) {
        setWindowImageProps((prevState) => ({
          ...prevState,
          current: prevState.tabletPortrait,
        }));
      } else if (
        matchMedia("(min-width: 375px) and (max-width: 512px)").matches
      ) {
        setWindowImageProps((prevState) => ({
          ...prevState,
          current: prevState.phone,
        }));
      } else {
        setWindowImageProps((prevState) => ({
          ...prevState,
          current: prevState.current,
        }));
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {message === "succses" ? (
        <PopMessage
          message="حساب کاربری با موفقیت ساخته شد :)"
          imageSrc={"/assets/icons/thumbs-up.gif"}
          tryAgain="انتقال خودکار در"
        />
      ) : (
        ""
      )}

      {message === "failed" ? (
        <PopMessage
          message="متاسفانه حساب کاربری ایجاد نشد :("
          imageSrc={"/assets/icons/thumbs-down.gif"}
          tryAgain="امتحان مجدد در"
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
        />

        <div className={styles.imageAndContent}>
          <div className={styles.loginImage}>
            {/* <div className={styles.loginImage}>
              <WindowsImage
                imageSrc={"/assets/images/register.jpg"}
                iconVisibility="none"
                imageWidthContainer={
                  windowImageProps.current.imageWidthContainer
                }
                imageHeightContainer={
                  windowImageProps.current.imageHeightContainer
                }
                imageWidth={windowImageProps.current.imageWidth}
                imageHeight={windowImageProps.current.imageHeight}
                beforeWidth={windowImageProps.current.beforeWidth}
                beforeHeight={windowImageProps.current.beforeHeight}
                beforeTop={windowImageProps.current.beforeTop}
                beforeRight={windowImageProps.current.beforeRight}
                imageRadius={windowImageProps.current.imageRadius}
                beforeBorderRadius={windowImageProps.current.beforeBorderRadius}
                beforeBorder={windowImageProps.current.beforeBorder}
              />
            </div> */}
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
                {" "}
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
                {" "}
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
                {" "}
                {errors.email?.message}{" "}
              </span>
              <div className={styles.passwordConatiner}>
                <div className={styles.password}>
                  <Input
                    id="password"
                    type="password"
                    label="رمز عبور"
                    placeholder="********"
                    register={{ ...register("password") }}
                  />
                </div>

                <div className={styles.repeatPassword}>
                  <Input
                    id="confrimPassword"
                    type="password"
                    label="تکرار رمزعبور"
                    placeholder="********"
                    register={{ ...register("confrimPassword") }}
                  />
                </div>
              </div>
              <span style={{ color: "#ff0000", fontFamily: "dana-light" }}>
                {" "}
                {errors.password?.message}{" "}
              </span>
              <span style={{ color: "#ff0000", fontFamily: "dana-light" }}>
                {" "}
                {errors.confrimPassword?.message}{" "}
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
