import React from "react";

//Components
import CardServices from "../components/cardServices";
import BluredBlob from "../components/bluredBlob";

//Styles
import styles from "./_services.module.scss";

const Services = () => {
  return (
    <div className={styles.servicesContainer}>
      <BluredBlob top={-150} left={-120} zIndex={-1} opacity={0.5} />
      <BluredBlob top={350} right={-150} zIndex={-1} opacity={0.5} />
      <div className={styles.servicesText}>
        <h2>
          <span> خدماتی </span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
          >
            <path
              d="M25 0L27.3918 19.2258L42.6777 7.32233L30.7742 22.6082L50 25L30.7742 27.3918L42.6777 42.6777L27.3918 30.7742L25 50L22.6082 30.7742L7.32233 42.6777L19.2258 27.3918L0 25L19.2258 22.6082L7.32233 7.32233L22.6082 19.2258L25 0Z"
              fill="#070604"
            />
          </svg>
          <br />
          که ارائه میدهیم
        </h2>

        <p>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از کاربردی آینده شناخت فراوان جامعه و متخصصان را می طلبد
        </p>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.cardOne}>
          <CardServices
            title={"میکاپ عروس"}
            details={`لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                        صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
                        متون بلکه روزنامه و  متخصصان را می طلبد `}
            cardServicesImage='/assets/images/services_1.jpg'
          />
        </div>

        <div className={styles.cardTwo}>
          <CardServices
            title={" آموزش میکاپ "}
            details={`لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
                            متون بلکه روزنامه و  متخصصان را می طلبد `}
            cardServicesImage='/assets/images/courses_1.jpg'
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
