import React from "react";

import styles from "./_help.module.scss";
import useTitle from "@/hooks/useTitle";

function Help() {
  useTitle("نگین زارع | راهنمای لایسنس");

  return (
    <div className={styles.container}>
      <p className={styles.title}>نحوه دسترسی به دوره:</p>
      <div className={styles.row}>
        <span className={styles.caution}>توجه: </span>
        <span>
          به منظور حفظ حق کپی رایت، دسترسی به دوره فقط در اسپات پلیر و بر روی یک
          سیستم امکان پذیر است!
        </span>
      </div>
      <div className={styles.row}>
        <p className={styles.steps}>قدم اول:</p>
        <p class={styles.stepsBody}>
          ابتدا از طریق لینک های زیر برنامه اسپات پلیر را متناسب با سیستم عامل
          خود دانلود و سپس نصب کنید.{" "}
        </p>
      </div>
      <div className={styles.row}>
        <a
          href="https://app.spotplayer.ir/assets/bin/spotplayer/setup.exe"
          target="_blank"
          rel="noreferrer"
        >
          <button className={styles.downloadButton}>دانلود نسخه ویندوز</button>
        </a>
        <a
          href="https://app.spotplayer.ir/assets/bin/spotplayer/setup.dmg"
          target="_blank"
          rel="noreferrer"
        >
          <button className={styles.downloadButton}>دانلود نسخه مک</button>
        </a>
        <a
          href="https://app.spotplayer.ir/assets/bin/spotplayer/setup.apk"
          target="_blank"
          rel="noreferrer"
        >
          <button className={styles.downloadButton}>دانلود نسخه اندروید</button>
        </a>
        <a href="https://sibapp.com/applications/1SpotPlayer?from=search">
          <button className={styles.downloadButton}>
            دانلود از سیب اپ (آیفون)
          </button>
        </a>
        <a href="https://sibapp.com/applications/1SpotPlayer?from=search">
          <button className={styles.downloadButton}>
            دانلود از ِ آی اپس (آیفون)
          </button>
        </a>
      </div>
      <div className={styles.row}>
        <p className={styles.steps}>قدم دوم:</p>
        <p className={styles.stepsBody}>
          لایسنس مخصوص به خودتان را در قسمت لایسنس ها کپی کنید و در برنامه اسپات
          پلیر وارد کنید تا دوره هایی که شرکت کردید را برایتان بیاورد.
        </p>
      </div>
      <p className={styles.helpTitle}>محل وارد کردن لایسنس:</p>
      <p className={styles.helpBody}>
        اگر برای بار اول برنامه اسپات پلیر را نصب میکنید به محض ورود، صفحه وارد
        کردن لایسنس را برایتان باز میکند و نیاز است که در کادر بزرگ بالا لایسنس
        را وارد کنید و تایید را بزنید. اگر از قبل برنامه اسپات پلیر را داشتید بر
        روی علامت + در سمت راست و بالای اسپات پلیر کلیک بکنید تا قسمت وارد کردن
        لایسنس را بیاورد و سپس لایسنس را وارد کنید.
      </p>
      <p className={`${styles.helpTitle} ${styles.caution}`}>مشکلات احتمالی:</p>
      <p className={styles.helpBody}>
        اگر با خطای 'دفعات مجاز استفاده از این لایسنس تمام شده است.' برخورد
        کردید به این معنی است که قبلا از لایسنس استفاده شده و یا در سیستم عامل
        اشتباهی وارد میشود(در صورت حل نشدن مشکل با پشتیبانی در تماس باشید)
      </p>
      <p className={styles.helpBody}>
        اگر لایسنس‌ وارد شد اما در هنگام پخش ویدیو با خطا مواجه شدید به دلیل نصب
        برنامه هایی است که صفحه لپتاپ را ریکورد و یا share میکنند. برای رفع این
        مشکل باید این برنامه هارا حذف کنید.
      </p>
      <p className={styles.warning}>توجه: </p>
      <p className={styles.helpBody}>
        در هنگام نصب برنامه آن را در درایوی بغیر از درایو C نصب کنید تا در آینده
        مشکلی پیش نیاید.
      </p>
      <p className={styles.helpBody}>
        تمامی لایسنس ها به صورت پیش فرض برای ویندوز فعال شده اند و فقط بر روی
        ویندوز معتبر هستند. در صورت مغایرت و تمایل به عوض کردن سیستم عامل با
        پشتیبانی در تماس باشید.
      </p>
    </div>
  );
}

export default Help;
