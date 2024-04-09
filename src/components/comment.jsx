import React from "react";

import styles from "./_comment.module.scss";

const Comment = ({ imgSrc, customerName, userTag, commentMessage }) => {
  return (
    <div className={styles.container}>

      <section className={styles.profile}>
        
        <img src={imgSrc} alt="commenter profile" />

        <div className={styles.line}></div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
        >
          <path
            d="M15.5 0.48877L17.6213 13.3674L30.5 15.4888L17.6213 17.6101L15.5 30.4888L13.3787 17.6101L0.5 15.4888L13.3787 13.3674L15.5 0.48877Z"
            fill="#070604"
          />
        </svg>
      </section>

      <section className={styles.comment}>
        <img src='assets/icons/quotes.svg' className={styles.quotes} alt="icon" />

        <h3>{customerName}</h3>

        <span>{userTag}</span>

        <div>{commentMessage}</div>

      </section>
    </div>
  );
};

export default Comment;
