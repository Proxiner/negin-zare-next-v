import React from 'react';

import styles from './_checkoutBox.module.scss'

import Image from "next/image";

const checkoutBox = ({image, productName, productdescript, price, numberCourse, totalPrice}) => {
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
                        <span className={styles.productName}> {productName}  </span>
                        <span className={styles.productdescript}> {productdescript} </span>
                    </div>
                </div>

                 <span className={styles.price}> {price} <i>تومان</i> </span>
            </div>

            <div className={styles.line}></div>

            <div className={styles.receiptPart}>
                <div className={styles.textAndNumberCourse}>
                    <span className={styles.text}> تعداد دوره ها</span>
                    <span className={styles.numberCourse} > {numberCourse} </span>
                </div>

                <div className={styles.totalPriceContainer}>
                    <span className={styles.totalPriceText}> قیمت کل </span>
                    <span className={styles.totalPrice}> {totalPrice} <i>تومان</i> </span>
                </div>
            </div>

            <button className={styles.payOff}> پــرداخت </button>
        </section>
    );
};

export default checkoutBox;