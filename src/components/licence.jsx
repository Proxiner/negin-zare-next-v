import React from "react";

import styles from "./licence.module.scss";

import { MdContentCopy } from "react-icons/md";

function Licence({ licence, handleCopy , title }) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h2> دوره : {title} </h2>
        <div className={styles.line}></div>
        <span> {licence.slice(0, 30)} </span>
      </div>
      <MdContentCopy onClick={handleCopy} />
    </div>
  );
}

export default Licence;
