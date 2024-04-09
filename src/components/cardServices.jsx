import React , {useState, useEffect} from 'react';

//Components
import WindowsImage from "./windowsImage";

//Styles
import styles from "./_cardServices.module.scss";


const CardServices = ({title, details, link, cardServicesImage}) => {

    const [windowImageProps, setWindowImageProps] = useState({

        laptop: {
          width: 170,
          height: 220,
          imageWidth: 90,
          imageHeight: 90,
          backgroundWidth: 170,
          backgroundHeight: 220,
          top: 10,
          right: -5,
          imageRadius: "120px 120px 0px 0px",
          backgroundRadius: "77.5px 77.5px 0px 0px",
          backgroundBorder: "0px solid #fff",
        },
    
        tablet: {
          width: 190,
          height: 240,
          imageWidth: 88,
          imageHeight: 88,
          backgroundWidth: 190,
          backgroundHeight: 220,
          top: 0,
          right: 0,
          imageRadius: "120px 120px 0px 0px",
          backgroundRadius: "77.5px 77.5px 0px 0px",
          backgroundBorder: "0px solid #EDD5C7",
        },
    
        phone: {
          width: 120,
          height: 150,
          imageWidth: 88,
          imageHeight: 88,
          backgroundWidth: 100,
          backgroundHeight: 150,
          top: 10,
          right: 0,
          imageRadius: "150px 150px 0px 0px",
          backgroundRadius: "150px 150px 0px 0px",
          backgroundBorder: "0px solid #EDD5C7",
        },
    
        current: {
          width: 200,
          height: 260,
          imageWidth: 90,
          imageHeight: 90,
          backgroundWidth: 200,
          backgroundHeight: 260,
          top: 10,
          right: 0,
          imageRadius: "120px 120px 0px 0px",
          backgroundRadius: "77.5px 77.5px 0px 0px",
          backgroundBorder: "0px solid #fff",
          },
    
      });


      useEffect(() => {

        const handleResize = () => {
          
          if (matchMedia("(min-width: 1366px) and (max-width: 1440px)").matches) {
            setWindowImageProps((prevState) => ({
              ...prevState,
              current: prevState.laptop,
            }));
    
          } else if (matchMedia("(min-width: 768px) and (max-width: 1365px)").matches) {
            setWindowImageProps((prevState) => ({
              ...prevState,
              current: prevState.tablet,
            }));
    
          } else if (matchMedia("(min-width: 320px) and (max-width: 512px)").matches) {
            setWindowImageProps((prevState) => ({
              ...prevState,
              current: prevState.phone,
            }));
    
          } else {
            setWindowImageProps((prevState) => ({
              ...prevState,
              current: prevState.current,
            }));
    
          }
        };
    
        window.addEventListener("resize", handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    return (
        <div className={styles.cardServicesContainer}>
            <div className={styles.rectangle}> </div>
            <section className={styles.context}>
                <div className={styles.imageContainer}>
                <WindowsImage
                imageSrc={cardServicesImage}
                iconVisibility="none"
                width={windowImageProps.current.width}
                height={windowImageProps.current.height}
                imageWidth={windowImageProps.current.imageWidth}
                imageHeight={windowImageProps.current.imageHeight}
                backgroundWidth={windowImageProps.current.backgroundWidth}
                backgroundHeight={windowImageProps.current.backgroundHeight}
                top={windowImageProps.current.top}
                right={windowImageProps.current.right}
                imageRadius={windowImageProps.current.imageRadius}
                backgroundRadius={windowImageProps.current.backgroundRadius}
                backgroundBorder={windowImageProps.current.backgroundBorder}
                padding='0'
                background='none'
                />
                </div>

                <div className={styles.textContainer}>
                        <span> {title} </span>
                        <p> {details} </p>
                        <a href={link}> بیشتر بخوانید </a>
                </div>
            </section>
        </div>
    );
};

export default CardServices;