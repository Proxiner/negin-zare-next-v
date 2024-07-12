import React from 'react';

import styles from './_checkout.module.scss'

import CheckoutBox from "./checkoutBox";

const CheckOut = () => {
    return (
        <div className={styles.container}>
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