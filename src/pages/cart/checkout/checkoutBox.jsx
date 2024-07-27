import React from "react";
import styles from "./_checkoutBox.module.scss";

import { HiOutlineTrash } from "react-icons/hi";

import Image from "next/image";

const checkoutBox = ({
  image,
  productName,
  productdescript,
  price,
  courseId,
  removeCourse,
}) => {
  const handleRemove = () => {
    removeCourse(courseId);
  };

  return (
    <section className={styles.checkoutBox}>
      <div className={styles.product}>
        <div className={styles.imageAndDescript}>
          <Image
            width={125}
            height={125}
            src={image}
            alt="images product"
            className={styles.imageCheckBox}
          />

          <div className={styles.description}>
            <span className={styles.productName}> {productName} </span>
            <span className={styles.productdescript}> {productdescript} </span>
            <span className={styles.price}>
              {price} <i>تومان</i>
            </span>
          </div>
        </div>

        <button className={styles.tooltip} onClick={handleRemove}>
          <HiOutlineTrash />
          <span className={styles.tooltiptext}> حذف از سبد خرید </span>
        </button>
      </div>

      <div className={styles.line}></div>
    </section>
  );
};

export default checkoutBox;
