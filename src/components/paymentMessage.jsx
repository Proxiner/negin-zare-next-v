import React from 'react';

import styles from "./_pamentMessage.module.scss";

import Link from 'next/link';
import Image from "next/image";

const PaymentMessage = ({imagePayment, statusPayment,  textPayment, linkPayment, linkTitlePayment}) => {
    return (
        <div className={styles.container}>
            <div className={styles.contetnt}>
                <Image
                    width={120}
                    height={120}
                    src={imagePayment}
                    alt={"peymentImage"}
                    className={styles.imagePayment}
                 />

                 <span className={styles.textPaymentContainer}>
                    {textPayment}
                    <br />
                    <br />
                    {statusPayment}
                 </span>

                 <Link href={linkPayment} className={styles.linkPaymentContent}> {linkTitlePayment} </Link>
            </div>
        </div>
    );
};

export default PaymentMessage;