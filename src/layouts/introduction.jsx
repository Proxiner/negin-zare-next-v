/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

//Components
import WindowsImage from "../components/windowsImage";

//Styles
import styles from "./_introduction.module.scss";

const Introduction = () => {
  const firstModel = {
    current: {
      width: 155,
      height: 222,
      imageWidth: 100,
      imageHeight: 100,
      imageRadius: "77.5px 77.5px 0px 0px",
      backgroundWidth: 155,
      backgroundHeight: 222,
      top: 10,
      right: -7,
      backgroundRadius: "77.5px 77.5px 0px 0px",
      backgroundBorder: "1px solid #fff",
    },

    laptop: {
      width: 155,
      height: 222,
      imageWidth: 100,
      imageHeight: 100,
      imageRadius: "77.5px 77.5px 0px 0px",
      backgroundWidth: 155,
      backgroundHeight: 222,
      top: 10,
      right: -7,
      backgroundRadius: "77.5px 77.5px 0px 0px",
      backgroundBorder: "1px solid #fff",
    },

    tabletLandscape: {
      width: 155,
      height: 222,
      imageWidth: 100,
      imageHeight: 100,
      imageRadius: "308.5px 308.5px 0px 0px",
      backgroundWidth: 155,
      backgroundHeight: 222,
      top: 10,
      right: -5,
      backgroundRadius: "77.5px 77.5px 0px 0px",
      beforeBorder: "1px solid #fff",
    },

    tabletPortrait: {
      width: 170,
      height: 240,
      imageWidth: 100,
      imageHeight: 100,
      imageRadius: "308.5px 308.5px 0px 0px",
      backgroundWidth: 170,
      backgroundHeight: 240,
      top: 10,
      right: -5,
      backgroundRadius: "77.5px 77.5px 0px 0px",
      backgroundBorder: "1px solid #fff",
    },

    phone: {
      width: 150,
      height: 200,
      imageWidth: 100,
      imageHeight: 100,
      imageRadius: "150px 150px 0px 0px",
      backgroundWidth: 150,
      backgroundHeight: 200,
      top: 10,
      right: -10,
      backgroundRadius: "77.5px 77.5px 0px 0px",
      backgroundBorder: "1px solid #fff",
    },
  };

  const [firstModelImageProperties, setFirstModelImageProperties] = useState(
    firstModel.current
  );

  const secondModel = {
    current: {
      width: 323,
      height: 509,
      imageWidth: 100,
      imageHeight: 100,
      imageRadius: "0 0 0 0",
      backgroundWidth: 335,
      backgroundHeight: 520,
      top: 10,
      right: -20,
      backgroundRadius: "0 0 0 0",
      backgroundBorder: "1px solid #fff",
    },

    laptop: {
      width: 323,
      height: 509,
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 335,
      backgroundHeight: 520,
      top: 10,
      right: -20,
      imageRadius: "0 0 0 0",
      backgroundRadius: "0 0 0 0",
      backgroundBorder: "1px solid #fff",
    },

    tabletLandscape: {
      width: 270,
      height: 400,
      imageWidth: 100,
      imageHeight: 100,
      imageRadius: "0 0 0 0",
      backgroundWidth: 270,
      backgroundHeight: 405,
      top: 10,
      right: -20,
      backgroundRadius: "0 0 0 0",
      backgroundBorder: "1px solid #fff",
    },

    tabletPortrait: {
      width: 210,
      height: 320,
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 210,
      backgroundHeight: 320,
      top: 10,
      right: -20,
      imageRadius: "0 0 0 0",
      backgroundRadius: "0 0 0 0",
      backgroundBorder: "1px solid #fff",
    },

    phone: {
      width: 140,
      height: 240,
      imageWidth: 100,
      imageHeight: 100,
      imageRadius: "0 0 0 0",
      backgroundWidth: 140,
      backgroundHeight: 240,
      top: 10,
      right: -5,
      backgroundRadius: "0 0 0 0",
      backgroundBorder: "1px solid #fff",
    },
  };

  const [secondModelImageProperties, setSecondModelImageProperties] = useState(
    secondModel.current
  );

  const thirdModel = {
    current: {
      width: 340,
      height: 520,
      imageRadius: "260px 260px 0 0",
      imageWidth: 100,
      imageHeight: 100,
      backgroundWidth: 340,
      backgroundHeight: 520,
      top: 10,
      right: 10,
      backgroundRadius: "260px 260px 0 0",
      backgroundBorder: "1px solid #fff",
    },

    laptop: {
      width: 340,
      height: 520,
      imageWidth: 100,
      imageHeight: 100,
      imageRadius: "260px 260px 0 0",
      backgroundWidth: 340,
      backgroundHeight: 520,
      top: 10,
      right: 10,
      backgroundRadius: "260px 260px 0 0",
      backgroundBorder: "1px solid #fff",
    },

    tabletLandscape: {
      width: 270,
      height: 400,
      imageWidth: 100,
      imageHeight: 100,
      imageRadius: "260px 260px 0 0",
      backgroundWidth: 270,
      backgroundHeight: 400,
      top: 10,
      right: 10,
      backgroundRadius: "260px 260px 0 0",
      backgroundBorder: "1px solid #fff",
    },

    tabletPortrait: {
      width: 220,
      height: 330,
      imageWidth: 100,
      imageHeight: 100,
      imageRadius: "260px 260px 0 0",
      backgroundWidth: 220,
      backgroundHeight: 330,
      top: 10,
      right: 10,
      backgroundRadius: "260px 260px 0 0",
      backgroundBorder: "1px solid #fff",
    },

    phone: {
      width: 150,
      height: 230,
      imageWidth: 100,
      imageHeight: 100,
      imageRadius: "260px 260px 0 0",
      backgroundWidth: 150,
      backgroundHeight: 230,
      top: 10,
      right: 10,
      backgroundRadius: "260px 260px 0 0",
      backgroundBorder: "1px solid #fff",
    },
  };

  const [thirdModelImageProperties, setthirdModelImageProperties] = useState(
    thirdModel.current
  );

  const handleResize = () => {
    if (matchMedia("(min-width: 1366px) and (max-width: 1440px)").matches) {
      setFirstModelImageProperties(firstModel.laptop);
      setSecondModelImageProperties(secondModel.laptop);
      setthirdModelImageProperties(thirdModel.laptop);
    } else if (
      matchMedia(
        "(min-width: 768px) and (max-width: 1024px) and (orientation : portrait)"
      ).matches
    ) {
      setFirstModelImageProperties(firstModel.tabletPortrait);
      setSecondModelImageProperties(secondModel.tabletPortrait);
      setthirdModelImageProperties(thirdModel.tabletPortrait);
    } else if (
      matchMedia(
        "(min-width: 1024px) and (max-width: 1365px) and (orientation : landscape)"
      ).matches
    ) {
      setFirstModelImageProperties(firstModel.tabletLandscape);
      setSecondModelImageProperties(secondModel.tabletLandscape);
      setthirdModelImageProperties(thirdModel.tabletLandscape);
    } else if (
      matchMedia("(min-width: 320px) and (max-width: 512px)").matches
    ) {
      setFirstModelImageProperties(firstModel.phone);
      setSecondModelImageProperties(secondModel.phone);
      setthirdModelImageProperties(thirdModel.phone);
    } else {
      setFirstModelImageProperties(firstModel.current);
      setSecondModelImageProperties(secondModel.current);
      setthirdModelImageProperties(thirdModel.current);
    }
  };


  useEffect(() => {
    
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[]);

  return (
    <>
      <div className={styles.introductionContainer}>
        <div className={styles.polygonContainer}></div>
        <div className={styles.introduction}>
          <div className={styles.experience}>
            <div className={styles.experienceImage}>
              <WindowsImage
                iconVisibility="none"
                imageSrc="/assets/images/intro_1.jpg"
                width={firstModelImageProperties.width}
                height={firstModelImageProperties.height}
                imageWidth={firstModelImageProperties.imageWidth}
                imageHeight={firstModelImageProperties.imageHeight}
                imageRadius={firstModelImageProperties.imageRadius}
                backgroundWidth={firstModelImageProperties.backgroundWidth}
                backgroundHeight={firstModelImageProperties.backgroundHeight}
                top={firstModelImageProperties.top}
                right={firstModelImageProperties.right}
                backgroundRadius={firstModelImageProperties.backgroundRadius}
                backgroundBorder={firstModelImageProperties.backgroundBorder}
                padding="0"
                background="none"
              />
            </div>
            <p className={styles.experienceParagraph}>
              آماری از این همه سال تجربه و موفقیت در زمینه میکاپ و آموزش دانشجو
            </p>
          </div>

          <div className={styles.counterBox}>
            <div className={styles.customer}>
              <span>+۱K</span>
              <span> مشتری راضی </span>
            </div>

            <div className={styles.student}>
              <span>+۲.۵K</span>
              <span> دانشجو موفق</span>
            </div>

            <div className={styles.yearExperience}>
              <span>+۳</span>
              <span> سال تجربه</span>
            </div>
          </div>
        </div>
        <div className={styles.starContainer}>
          <div className={styles.starLine}> </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
          >
            <path
              d="M30 0L32.2961 24.4567L51.2132 8.7868L35.5433 27.7039L60 30L35.5433 32.2961L51.2132 51.2132L32.2961 35.5433L30 60L27.7039 35.5433L8.7868 51.2132L24.4567 32.2961L0 30L24.4567 27.7039L8.7868 8.7868L27.7039 24.4567L30 0Z"
              fill="white"
            />
          </svg>
          <div className={styles.starLine}> </div>
        </div>

        <div className={styles.aboutNeginContainer}>
          <div className={styles.aboutNeginRightImage}>
            <WindowsImage
              iconVisibility="none"
              imageSrc="/assets/images/intro_2.jpg"
              width={secondModelImageProperties.width}
              height={secondModelImageProperties.height}
              imageWidth={secondModelImageProperties.imageWidth}
              imageHeight={secondModelImageProperties.imageHeight}
              imageRadius={secondModelImageProperties.imageRadius}
              backgroundWidth={secondModelImageProperties.backgroundWidth}
              backgroundHeight={secondModelImageProperties.backgroundHeight}
              top={secondModelImageProperties.top}
              right={secondModelImageProperties.right}
              backgroundRadius={secondModelImageProperties.backgroundRadius}
              backgroundBorder={secondModelImageProperties.backgroundBorder}
              padding="0"
              background="none"
            />
          </div>

          <div className={styles.textAndImage}>
            <div className={styles.text}>
              <h2> داستان شروع یک نقاشی </h2>
              <p>
                میکاپ کردن برای من مثل یه نقاشی میمونه وقتی که از دنیای رنگها با
                قلمم شروع میکنم تا هنر <br />
                جادویی دستهایم را به نمایش بزارم{" "}
              </p>
              <button> بیشتر بخوانید... </button>
            </div>

            <div className={styles.image}>
              <WindowsImage
                iconVisibility="none"
                imageSrc="/assets/images/intro_3.jpg"
                width={thirdModelImageProperties.width}
                height={thirdModelImageProperties.height}
                imageWidth={thirdModelImageProperties.imageWidth}
                imageHeight={thirdModelImageProperties.imageHeight}
                imageRadius={thirdModelImageProperties.imageRadius}
                backgroundWidth={thirdModelImageProperties.backgroundWidth}
                backgroundHeight={thirdModelImageProperties.backgroundHeight}
                top={thirdModelImageProperties.top}
                right={thirdModelImageProperties.right}
                backgroundRadius={thirdModelImageProperties.backgroundRadius}
                backgroundBorder={thirdModelImageProperties.backgroundBorder}
                padding="0"
                background="none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduction;
