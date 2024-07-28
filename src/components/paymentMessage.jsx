import React, { useEffect, useRef, useState } from 'react';

import styles from "./_pamentMessage.module.scss";

import Link from 'next/link';
import Image from "next/image";

const PaymentMessage = ({imagePayment, statusPayment,  textPayment, linkPayment, linkTitlePayment, seconds}) => {
    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef();

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [])

    useEffect (() => {
        if (countdown <= 0) {
            clearInterval(timerId.current);
        }
    })

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
                    {statusPayment}
                 </span>

                 <Link href={linkPayment} className={styles.linkPaymentContent}> {linkTitlePayment} </Link>

                 <span className={styles.countdownText}> انتقال خودکار: {countdown} </span>
            </div>
        </div>
    );
};

export default PaymentMessage;