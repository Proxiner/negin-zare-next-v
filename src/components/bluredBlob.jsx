import React from 'react';

import styles from './_bluredBlob.module.scss';

const BluredBlob = ({top, bottom, right, left , opacity , zIndex}) => {
    return (
        <div className={styles.blob} style={{top : `${top}px` , bottom : `${bottom}px` , right : `${right}px` , left : `${left}px` , opacity : `${opacity}` , zIndex: `${zIndex}` }}></div>
    );
};

export default BluredBlob;