import React, { useState, useEffect } from "react";

import styles from "./_slides.module.scss";

import Link from 'next/link';

import WindowsImage from "./windowsImage";

const Slides = ({
  title,
  price,
  hours,
  sessions,
  instructor,
  type,
  description,
  image,
}) => {
  const [windowImageProps, setWindowImageProps] = useState({
    current: {
      width: 465,
      height: 600,
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 465,
      backgroundHeight: 600,
      top: 10,
      right: -15,
      imageRadius: "260px 260px 0px 0px",
      backgroundRadius: "260px 260px 0px 0px",
      backgroundBorder: "1px solid #000",
    },

    laptop: {
      width: 440,
      height: 550,
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 440,
      backgroundHeight: 550,
      top: 10,
      right: -15,
      imageRadius: "260px 260px 0px 0px",
      backgroundRadius: "260px 260px 0px 0px",
      backgroundBorder: "1px solid #000",
    },

    tabletLandscape: {
      width: 350,
      height: 450,
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 350,
      backgroundHeight: 450,
      top: 10,
      right: -15,
      imageRadius: "260px 260px 0px 0px",
      backgroundRadius: "260px 260px 0px 0px",
      backgroundBorder: "1px solid #000",
    },

    tabletPortrait: {
      width: 330,
      height: 500,
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 330,
      backgroundHeight: 500,
      top: 10,
      right: -15,
      imageRadius: "260px 260px 0px 0px",
      backgroundRadius: "260px 260px 0px 0px",
      backgroundBorder: "1px solid #000",
    },

    phone: {
      width: 330,
      height: 400,
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 330,
      backgroundHeight: 400,
      top: 10,
      right: -15,
      imageRadius: "260px 260px 0px 0px",
      backgroundRadius: "260px 260px 0px 0px",
      backgroundBorder: "1px solid #000",
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
    <section className={styles.slider}>
      <div className={styles.courseDetails}>
        <h3>{title}</h3>

        <div className={styles.price}>
          <span>قیمت دوره :</span>
          <span>
            {price} <i>تومان</i>
          </span>
        </div>

        <div className={styles.hours}>
          <span>زمان دوره : </span>
          <i>{hours}</i>
        </div>

        <div className={styles.sessions}>
          <span>تعداد جلسات : </span>
          <i>{sessions}</i>
        </div>

        <div className={styles.instructor}>
          <span>مدرس :</span>
          <i>{instructor}</i>
        </div>

        <div className={styles.type}>
          <span>نوع دوره : </span>
          <i>{type}</i>
        </div>

        <button className={styles.readMore}>بیشتر بخوانید</button>
      </div>
      <div className={styles.model}>
        <WindowsImage
          imageSrc={image}
          iconVisibility="none"
          width={windowImageProps.current.width}
          height={windowImageProps.current.height}
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
      <div className={styles.details}>
        <p>{description}</p>
        <Link className={styles.readMore} href='/courses'>
          بیشتر بخوانید
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.2501 11C19.2501 11.1824 19.1776 11.3572 19.0487 11.4862C18.9198 11.6151 18.7449 11.6875 18.5626 11.6875H5.09701L10.1115 16.7011C10.1753 16.765 10.226 16.8408 10.2606 16.9243C10.2951 17.0077 10.3129 17.0972 10.3129 17.1875C10.3129 17.2779 10.2951 17.3673 10.2606 17.4508C10.226 17.5342 10.1753 17.61 10.1115 17.6739C10.0476 17.7378 9.97175 17.7885 9.88829 17.823C9.80484 17.8576 9.71539 17.8754 9.62505 17.8754C9.53472 17.8754 9.44527 17.8576 9.36181 17.823C9.27835 17.7885 9.20252 17.7378 9.13865 17.6739L2.95115 11.4864C2.88722 11.4226 2.83652 11.3467 2.80192 11.2633C2.76732 11.1798 2.74951 11.0904 2.74951 11C2.74951 10.9097 2.76732 10.8202 2.80192 10.7367C2.83652 10.6533 2.88722 10.5775 2.95115 10.5136L9.13865 4.32611C9.26765 4.19711 9.44262 4.12463 9.62505 4.12463C9.80749 4.12463 9.98246 4.19711 10.1115 4.32611C10.2405 4.45511 10.3129 4.63008 10.3129 4.81252C10.3129 4.99495 10.2405 5.16992 10.1115 5.29892L5.09701 10.3125H18.5626C18.7449 10.3125 18.9198 10.3849 19.0487 10.5139C19.1776 10.6428 19.2501 10.8177 19.2501 11Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Slides;
