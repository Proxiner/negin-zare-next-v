/* eslint-disable @next/next/no-img-element */
import React from "react";

import styles from "./_windowsImage.module.scss";

const WindowsImage = ({
  width,
  height,
  borderRadius,
  position,
  imageSrc,
  imgVisibility,
  imageWidth,
  imageHeight,
  imageRadius,
  iconBackground,
  backgroundWidth,
  backgroundHeight,
  top,
  right,
  backgroundBorder,
  backgroundRadius,
  padding,
  background,
}) => {
  return (
    <div
      className={styles.image}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}`,
        position: `${position}`,
        padding : `${padding}`,
        background : `${background}`
      }}
    >
      <img
        src={imageSrc}
        alt="model"
        style={{
          display: `${imgVisibility}`,
          width: `${imageWidth}%`,
          height: `${imageHeight}%`,
          borderRadius: `${imageRadius}`,
        }}
      />

      <div
        className={styles.before}
        style={{
          width: `${backgroundWidth}px`,
          height: `${backgroundHeight}px`,
          top: `${top}px`,
          right: `${right}px`,
          borderRadius: `${backgroundRadius}`,
          border: `${backgroundBorder}`,
          backgroundColor: `${iconBackground}`,
        }}
      ></div>
    </div>
  );
};

export default WindowsImage;
