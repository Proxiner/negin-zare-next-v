"use client";

import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";

//Components
import WindowsImage from "../../components/windowsImage";
import OTP from "@/components/otp";
// import PopMessage from "@/components/popMessage";

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

  // const [message , setMessage] = useState("succses");

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

  //validait

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <Image
          width={100}
          height={100}
          src="/assets/images/phone-logo.png"
          alt="phone-logo"
          className={styles.logo}
        />
        <div className={styles.imageAndContent}>
          <div className={styles.loginImage}>
            {/* <WindowsImage
              imageSrc="/assets/images/intro_2.jpg"
              iconVisibility="none"
              imageWidthContainer={windowImageProps.current.imageWidthContainer}
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
            /> */}
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
