import React, { useState, useEffect } from "react";

import styles from "./_productListing.module.scss";

import WindowsIcon from "./windowsIcon";

const ProductListing = ({ indicator, pulledSrc, title, details }) => {
  const [windowImageProps, setWindowImageProps] = useState({
    current: {
      width: 100,
      height: 140,
      backgroundWidth: 100,
      backgroundHeight: 140,
      iconWidth: 65,
      iconHeight: 65,
      top: 5,
      right: -5,
      backgroundColor: "#070604",
      borderRadius: "50px 50px 0 0",
      border: "1px solid #070604",
      backgroundBorderRadius: "50px 50px 0 0",
    },

    laptop: {
      width: 85,
      height: 110,
      backgroundWidth: 85,
      backgroundHeight: 110,
      iconWidth: 50,
      iconHeight: 50,
      top: 5,
      right: -5,
      backgroundColor: "#070604",
      borderRadius: "50px 50px 0 0",
      border: "1px solid #070604",
      backgroundBorderRadius: "50px 50px 0 0",
    },

    tabletLandscape: {
      width: 70,
      height: 97,
      backgroundWidth: 70,
      backgroundHeight: 97,
      iconWidth: 50,
      iconHeight: 50,
      top: 5,
      right: -5,
      backgroundColor: "#070604",
      borderRadius: "50px 50px 0 0",
      border: "1px solid #070604",
      backgroundBorderRadius: "50px 50px 0 0",
    },

    tabletPortrait: {
      width: 70,
      height: 97,
      backgroundWidth: 70,
      backgroundHeight: 97,
      iconWidth: 50,
      iconHeight: 50,
      top: 5,
      right: -5,
      backgroundColor: "#070604",
      borderRadius: "50px 50px 0 0",
      border: "1px solid #070604",
      backgroundBorderRadius: "50px 50px 0 0",
    },

    phone: {
      width: 70,
      height: 97,
      backgroundWidth: 70,
      backgroundHeight: 97,
      iconWidth: 50,
      iconHeight: 50,
      top: 5,
      right: -5,
      backgroundColor: "#070604",
      borderRadius: "50px 50px 0 0",
      border: "1px solid #070604",
      backgroundBorderRadius: "50px 50px 0 0",
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
    <div className={styles.container}>
      <section className={styles.visualization}>
        <div className={styles.indicatorContainer}>{indicator}</div>

        <div className={styles.windowIconComponent}>
          <WindowsIcon
            iconSrc={pulledSrc}
            width={windowImageProps.current.width}
            height={windowImageProps.current.height}
            backgroundWidth={windowImageProps.current.backgroundWidth}
            backgroundHeight={windowImageProps.current.backgroundHeight}
            iconWidth={windowImageProps.current.iconWidth}
            iconHeight={windowImageProps.current.iconHeight}
            top={windowImageProps.current.top}
            right={windowImageProps.current.right}
            backgroundColor={windowImageProps.current.backgroundColor}
            borderRadius={windowImageProps.current.borderRadius}
            border={windowImageProps.current.border}
            backgroundBorderRadius={
              windowImageProps.current.backgroundBorderRadius
            }
          />
        </div>
      </section>

      <section className={styles.information}>
        <h2>{title}</h2>
        <p>{details}</p>
      </section>
    </div>
  );
};

export default ProductListing;
