import React, { useState, useEffect, useRef } from "react";

import styles from "./_comments.module.scss";

import WindowsImage from "../components/windowsImage";
import Comment from "../components/comment";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/effect-creative";

const Comments = () => {
  const swiperRef = useRef(null);
  const nextBtn = useRef();
  const prevBtn = useRef();

  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleNext = () => {
    if (swiperRef.current) {
      if (
        swiperRef.current.activeIndex ===
        swiperRef.current.slides.length - 1
      ) {
        return;
      }
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      if (swiperRef.current.activeIndex === 0) {
        return;
      }
      swiperRef.current.slidePrev();
    }
  };

  const [windowImageProps, setWindowImageProps] = useState({
    current: {
      width: 261,
      height: 463,
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 261,
      backgroundHeight: 463,
      top: 8,
      right: -8,
      imageRadius: "130px 130px 0px 0px",
      backgroundRadius: "130px 130px 0px 0px",
      backgroundBorder: "1px solid #070604",
    },

    laptop: {
      width: 260,
      height: 465,
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 260,
      backgroundHeight: 465,
      top: 8,
      right: -10,
      imageRadius: "130px 130px 0px 0px",
      backgroundRadius: "130px 130px 0px 0px",
      backgroundBorder: "1px solid #070604",
    },

    tabletLandscape: {
      width: 230,
      height: 380,
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 230,
      backgroundHeight: 380,
      top: 8,
      right: -8,
      imageRadius: "130px 130px 0px 0px",
      backgroundRadius: "130px 130px 0px 0px",
      backgroundBorder: "1px solid #070604",
    },

    tabletPortrait: {
      width: 261,
      height: 463,
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 261,
      backgroundHeight: 463,
      top: 8,
      right: -8,
      imageRadius: "130px 130px 0px 0px",
      backgroundRadius: "130px 130px 0px 0px",
      backgroundBorder: "1px solid #070604",
    },

    phone: {
      width: 261,
      height: 463,
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 261,
      backgroundHeight: 463,
      top: 8,
      right: -8,
      imageRadius: "130px 130px 0px 0px",
      backgroundRadius: "130px 130px 0px 0px",
      backgroundBorder: "1px solid #070604",
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
        matchMedia("(min-width: 320px) and (max-width: 512px)").matches
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
    <div className={styles.container} id="comments">
      <div className={styles.slider}>
        <Swiper
          allowTouchMove={false}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -800],
              rotate: [180, 0, 0],
            },
            next: {
              shadow: true,
              translate: [0, 0, -800],
              rotate: [-180, 0, 0],
            },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={() => {
            setIsLastSlide(
              swiperRef.current.activeIndex ===
                swiperRef.current.slides.length - 1
            );
          }}
          modules={[EffectCreative]}
        >
          <SwiperSlide className={styles.slides}>
            <h2>
              نظرات <span>دانشجویان</span> و <br />
              <span className={styles.star}>
                مشتریان ما
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 0L21.9134 15.3806L34.1421 5.85786L24.6194 18.0866L40 20L24.6194 21.9134L34.1421 34.1421L21.9134 24.6194L20 40L18.0866 24.6194L5.85786 34.1421L15.3806 21.9134L0 20L15.3806 18.0866L5.85786 5.85786L18.0866 15.3806L20 0Z"
                    fill="#070604"
                  />
                </svg>
              </span>
            </h2>

            <div className={styles.textBasedComment}>
              <Comment
                imgSrc='/assets/images/comments_1.jpg'
                customerName="مریم معتمدی"
                userTag="مشتری"
                commentMessage="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه کاربردهای متنوع با هدف بهبود ابزارهای کاربردی"
              />
            </div>

            <div className={styles.modelContainer}>
              <WindowsImage
                imageSrc='/assets/images/comments_main.jpg'
                iconVisibility="none"
                width={
                  windowImageProps.current.width
                }
                height={
                  windowImageProps.current.height
                }
                imageWidth={windowImageProps.current.imageWidth}
                imageHeight={windowImageProps.current.imageHeight}
                backgroundWidth={windowImageProps.current.backgroundWidth}
                backgroundHeight={windowImageProps.current.backgroundHeight}
                top={windowImageProps.current.top}
                right={windowImageProps.current.right}
                imageRadius={windowImageProps.current.imageRadius}
                backgroundRadius={windowImageProps.current.backgroundRadius}
                backgroundBorder={windowImageProps.current.backgroundBorder}
                padding='0'
                background='none'
              />
            </div>

            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله
              مورد نیاز بهبود ابزارهای کاربردی می باشد
            </p>

            <div className={styles.voiceBasedComment}>
              <Comment
                imgSrc='/assets/images/comments_2.jpg'
                customerName="روبکا بینابی"
                userTag="دانشجو"
                commentMessage="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه کاربردهای متنوع با هدف بهبود ابزارهای کاربردی"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide className={styles.slides}>
            <h2>
              نظرات <span>دانشجویان</span> و <br />
              <span className={styles.star}>
                مشتریان ما
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 0L21.9134 15.3806L34.1421 5.85786L24.6194 18.0866L40 20L24.6194 21.9134L34.1421 34.1421L21.9134 24.6194L20 40L18.0866 24.6194L5.85786 34.1421L15.3806 21.9134L0 20L15.3806 18.0866L5.85786 5.85786L18.0866 15.3806L20 0Z"
                    fill="#070604"
                  />
                </svg>
              </span>
            </h2>

            <div className={styles.textBasedComment}>
              <Comment
                imgSrc='/assets/images/comments_1.jpg'
                customerName="مریم معتمدی"
                userTag="مشتری"
                commentMessage="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه کاربردهای متنوع با هدف بهبود ابزارهای کاربردی"
              />
            </div>

            <div className={styles.modelContainer}>
              <WindowsImage
                imageSrc='/assets/images/comments_main.jpg'
                iconVisibility="none"
                width={
                  windowImageProps.current.width
                }
                height={
                  windowImageProps.current.height
                }
                imageWidth={windowImageProps.current.imageWidth}
                imageHeight={windowImageProps.current.imageHeight}
                backgroundWidth={windowImageProps.current.backgroundWidth}
                backgroundHeight={windowImageProps.current.backgroundHeight}
                top={windowImageProps.current.top}
                right={windowImageProps.current.right}
                imageRadius={windowImageProps.current.imageRadius}
                backgroundRadius={windowImageProps.current.backgroundRadius}
                backgroundBorder={windowImageProps.current.backgroundBorder}
                padding='0'
                background='none'
              />
            </div>

            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله
              مورد نیاز بهبود ابزارهای کاربردی می باشد
            </p>

            <div className={styles.voiceBasedComment}>
              <Comment
                imgSrc='/assets/images/comments_2.jpg'
                customerName="روبکا بینابی"
                userTag="دانشجو"
                commentMessage="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه کاربردهای متنوع با هدف بهبود ابزارهای کاربردی"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <div className={styles.controls}>
          <div
            className={`${styles.prevBtn} ${
              swiperRef.current?.activeIndex === 0 ? styles.disabled : ""
            }`}
            ref={prevBtn}
            onClick={handlePrev}
          >
            <img src='assets/icons/next-navigation.svg' alt="next slide" />
          </div>
          <div
            className={`${styles.nextBtn} ${
              isLastSlide ? styles.disabled : ""
            }`}
            ref={nextBtn}
            onClick={handleNext}
          >
            <img src='assets/icons/prev-navigation.svg' alt="prev slide" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
