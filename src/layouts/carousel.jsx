import React, { useRef, useState } from "react";

import styles from "./_carousel.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Navigation } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/effect-flip";
import "swiper/scss/navigation";

import Slides from "../components/slides";
import BluredBlob from "../components/bluredBlob";
import Image from "next/image";

const Carousel = () => {
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

  return (
    <div className={styles.carouselWrapper} id="courses">
      <BluredBlob bottom={-100} right={-100} zIndex={-1} opacity={0.5} />
      <section className={styles.title}>
        <svg
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 0L19.1742 13.458L29.8744 5.12563L21.542 15.8258L35 17.5L21.542 19.1742L29.8744 29.8744L19.1742 21.542L17.5 35L15.8258 21.542L5.12563 29.8744L13.458 19.1742L0 17.5L13.458 15.8258L5.12563 5.12563L15.8258 13.458L17.5 0Z"
            fill="#070604"
          />
        </svg>

        <h2>
          <span>پکیج های آموزشی</span> میکاپ عروس
        </h2>
        <svg
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 0L19.1742 13.458L29.8744 5.12563L21.542 15.8258L35 17.5L21.542 19.1742L29.8744 29.8744L19.1742 21.542L17.5 35L15.8258 21.542L5.12563 29.8744L13.458 19.1742L0 17.5L13.458 15.8258L5.12563 5.12563L15.8258 13.458L17.5 0Z"
            fill="#070604"
          />
        </svg>
      </section>

      <Swiper
        className={styles.carousel}
        effect={"flip"}
        modules={[EffectFlip, Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={() => {
          setIsLastSlide(
            swiperRef.current.activeIndex ===
              swiperRef.current.slides.length - 1
          );
        }}
      >
        <SwiperSlide>
          <Slides
            title="کلاس های صفر تا صد تخصصی از مبتدی تا پیشرفته"
            price="۱۰.۰۰۰.۰۰۰"
            hours="۱۲۰ ساعت آموزش"
            sessions="۲۱ جلسه"
            instructor="نگین زارع"
            type="حضوری و آنلاین"
            description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز "
            image='/assets/images/courses_1.jpg'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slides
            title="کلاس های صفر تا صد تخصصی از مبتدی تا پیشرفته"
            price="۲۰.۰۰۰.۰۰۰"
            hours="۸۰ ساعت آموزش"
            sessions="۱۵ جلسه"
            instructor="نگین زارع"
            type="آنلاین"
            description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز "
            image='/assets/images/courses_2.jpg'
          />
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
          <Image width={13} height={24} src='/assets/icons/next-navigation.svg' alt="next slide" />
        </div>
        <div
          className={`${styles.nextBtn} ${isLastSlide ? styles.disabled : ""}`}
          ref={nextBtn}
          onClick={handleNext}
        >
          <Image width={13} height={24} src='/assets/icons/prev-navigation.svg' alt="prev slide" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
