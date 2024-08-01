import Link from "next/link";
import styles from "./_notifyIphoneUsers.module.scss";

const NotifyIphoneUsers = () => {
  return (
    <div className={styles.container}>
      <section>
        <h1 className={styles.title}>
          نکته مهم : این دوره نسخه <span className={styles.web}> وب </span> رو
          پشتیبانی نمیکنه!
        </h1>
        <p className={styles.important}>
          دوستانی که <span className={styles.iphone}> آیفون </span> دارند باید
          از <span className={styles.sibapp}>sibapp</span> یا{" "}
          <span className={styles.iapps}>IApps</span> اشتراک خریداری کنند و حتما
          از داخل این برنامه‌ها می‌توانید نسخه{" "}
          <span className={styles.spotplayer}>spotplayer</span> برای آیفون
          دانلود کنید.
          <br /> - برای <span className={styles.windows}> ویندوز </span> یا{" "}
          <span className={styles.android}> اندروید </span> یا{" "}
          <span className={styles.mac}> مک </span> با مراجعه به سایت{" "}
          <Link
            target="_blank"
            href={"https://spotplayer.ir/"}
            className={styles.spotplayer}
          >
            spotplayer.ir
          </Link>{" "}
          به صورت رایگان این برنامه رو تهیه کنند!
        </p>
        <hr />
        <h3>
          {" "}
          برای راهنمایی بیشتر به صفحه{" "}
          <Link className={styles.help} href={"/help"}>
            {" "}
            راهنمای لایسنس{" "}
          </Link>{" "}
          بروید!{" "}
        </h3>
      </section>
    </div>
  );
};

export default NotifyIphoneUsers;
