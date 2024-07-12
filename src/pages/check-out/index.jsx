import React from 'react';

import styles from './_checkout.module.scss'

import CheckoutBox from "./checkoutBox";

import Link from 'next/link';
import Image from "next/image";

const CheckOut = () => {
    return (
        <div className={styles.container}>

            <div className={styles.checkoutNav}>
                <span className={styles.navText}> صفحه پرداخت </span>
                <Link href="/"> <Image src="/assets/images/logo.png" alt='logo' width={100} height={50} className={styles.navImage} />  </Link>
                <Link href="/" className={styles.navLink}> درگاه پرداخت </Link>
            </div>

            <CheckoutBox
                image="/assets/images/intro_2.jpg"
                productName="میکاپ اسموکی"
                productdescript="نگین زارع ــ مدرس دوره" 
                price="۲،۹۰۰،۰۰۰"
                numberCourse="۱"
                totalPrice="2,900,000"
             />
        </div>
    );
};

export default CheckOut;