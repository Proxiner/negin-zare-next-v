import React from "react";

import styles from "./_windowsIcon.module.scss";

const WindowsIcon = ({
  width,
  height,
  backgroundColor,
  iconVisibility,
  iconWidth,
  iconHeight,
  iconSrc,
  borderRadius,
  border,
  top,
  right,
  backgroundWidth,
  backgroundHeight,
  backgroundBorderRadius,
}) => {
  return (
    <div
      className={styles.container}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}`,
        backgroundColor: `${backgroundColor}`,
      }}
    >
      <img
        src={iconSrc}
        alt="icon"
        style={{
          display: `${iconVisibility}`,
          width: `${iconWidth}px`,
          height: `${iconHeight}px`,
        }}
      />

      <div
        className={styles.before}
        style={{
          width : `${backgroundWidth}px`,
          height : `${backgroundHeight}px`,
          border: `${border}`,
          borderRadius: `${backgroundBorderRadius}`,
          top: `${top}px`,
          right: `${right}px`,
        }}
      ></div>
    </div>
  );
};

export default WindowsIcon;
