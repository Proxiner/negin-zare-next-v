import React from 'react';

import styles from "./_faqTitles.module.scss";

const faqTitles = () => {
    return (
        <details className={styles.container}>
            <summary> من آیفون دارم، چجوری دوره ها رو ببینم؟ </summary>
            <p> قدم به قدم مراحل زیر را انجام بدید </p>
            <ol>
                <li> خریداری اشتراک iApps یا sibapp </li>
                <li> بعد از خریداری برنامه Spotplayer را دانلود کنید. </li>
                <li> لایسنس را داخل برنامه جایگذاری (پیست / paste) کنید </li>
            </ol>
           </details>
    );
}

export default faqTitles;