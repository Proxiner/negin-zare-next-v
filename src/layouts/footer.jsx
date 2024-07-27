import React from 'react';

//Styles
import styles from "./_footer.module.scss";

import Image from 'next/image';

const Footer = () => {
    return (
        <section className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <div className={styles.linksContainer}>
                    <div className={styles.essentiallinks}>
                        <span> لینک های کاربردی </span>
                        <ol>
                            <li> وبلاگ </li>
                            <li> خدمات </li>
                            <li> درباره ما </li>
                            <li> تماس با ما </li>
                        </ol>
                    </div>

                    <div className={styles.myServices}>
                        <span> خدمات من </span>
                        <ol>
                            <li> آموزش حضوری </li>
                            <li> پکیج میکاپ همراه با تیم</li>
                            <li> پکیج میکاپ VIP </li>
                            <li> کلاس های صفر تا صد</li>
                            <li> کلاس های آنلاین </li>
                        </ol>
                    </div>
                </div>

                <div className={styles.bioNeginContainer}>
                    <div className={styles.bioNegin}>
                        <Image width={120} height={120} src='/assets/images/negin-logo.png' alt='neginLogo'/>
                        <p>
                        نگین زارع ،میکاپ آرتیست، کارآفرین، مدرس گریم عروس و فشن 
                        و چهره پردازی تخصصی و استایلیست بسیار حرفه ای است .او در 
                        رشته گرافیک از هنرستان فارغ التحصیل شده و در دانشگاه نیز در 
                        رشته تصویرسازی کتاب داستان کودک و نوجوان ادامه تحصیل داد...
                        </p>

                        <div className={styles.socialNetworks}>
                            <span> ما را دنبال کنید: </span>
                            <div className={styles.socialNetworksIcons}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M22.2075 2.94415C22.0913 2.84381 21.9499 2.77708 21.7986 2.75114C21.6473 2.7252 21.4917 2.74105 21.3487 2.79697L2.34937 10.2323C2.0801 10.337 1.85214 10.5263 1.6998 10.7718C1.54745 11.0173 1.47898 11.3056 1.50468 11.5934C1.53037 11.8811 1.64886 12.1527 1.84229 12.3673C2.03572 12.5819 2.29362 12.7279 2.57718 12.7832L7.49999 13.7498V19.2388C7.49902 19.5378 7.58787 19.8302 7.75503 20.0781C7.92219 20.326 8.15995 20.518 8.43749 20.6292C8.71461 20.7423 9.01936 20.7695 9.31213 20.7071C9.60489 20.6447 9.87211 20.4957 10.0791 20.2795L12.4528 17.8176L16.2187 21.1138C16.4904 21.3548 16.8409 21.4882 17.2041 21.4888C17.3632 21.4887 17.5214 21.4637 17.6728 21.4148C17.9203 21.3363 18.1428 21.1943 18.3183 21.003C18.4938 20.8117 18.6162 20.5778 18.6731 20.3245L22.4784 3.77009C22.5125 3.62079 22.5052 3.46505 22.4575 3.31955C22.4098 3.17405 22.3234 3.04428 22.2075 2.94415ZM16.4756 6.31915L8.07656 12.3342L3.42656 11.422L16.4756 6.31915ZM8.99999 19.2388V14.7876L11.3241 16.8257L8.99999 19.2388ZM17.2059 19.9888L9.45468 13.192L20.6109 5.19603L17.2059 19.9888Z" fill="#070604"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 32 33" fill="none">
                                <path d="M16 10.4888C14.8133 10.4888 13.6533 10.8407 12.6666 11.5C11.6799 12.1592 10.9108 13.0963 10.4567 14.1927C10.0026 15.289 9.88378 16.4954 10.1153 17.6593C10.3468 18.8232 10.9182 19.8923 11.7574 20.7314C12.5965 21.5705 13.6656 22.142 14.8295 22.3735C15.9933 22.605 17.1997 22.4862 18.2961 22.032C19.3925 21.5779 20.3295 20.8089 20.9888 19.8222C21.6481 18.8355 22 17.6755 22 16.4888C21.9983 14.898 21.3657 13.3728 20.2408 12.248C19.116 11.1231 17.5908 10.4904 16 10.4888ZM16 20.4888C15.2089 20.4888 14.4355 20.2542 13.7777 19.8146C13.1199 19.3751 12.6072 18.7504 12.3045 18.0195C12.0017 17.2886 11.9225 16.4843 12.0769 15.7084C12.2312 14.9325 12.6122 14.2198 13.1716 13.6603C13.731 13.1009 14.4437 12.72 15.2196 12.5656C15.9956 12.4113 16.7998 12.4905 17.5307 12.7933C18.2616 13.096 18.8864 13.6087 19.3259 14.2665C19.7654 14.9243 20 15.6976 20 16.4888C20 17.5496 19.5786 18.567 18.8284 19.3172C18.0783 20.0673 17.0609 20.4888 16 20.4888ZM22 3.48877H10C8.14409 3.49075 6.36477 4.22889 5.05245 5.54121C3.74012 6.85354 3.00199 8.63286 3 10.4888V22.4888C3.00199 24.3447 3.74012 26.124 5.05245 27.4363C6.36477 28.7486 8.14409 29.4868 10 29.4888H22C23.8559 29.4868 25.6352 28.7486 26.9476 27.4363C28.2599 26.124 28.998 24.3447 29 22.4888V10.4888C28.998 8.63286 28.2599 6.85354 26.9476 5.54121C25.6352 4.22889 23.8559 3.49075 22 3.48877ZM27 22.4888C27 23.8149 26.4732 25.0866 25.5355 26.0243C24.5979 26.962 23.3261 27.4888 22 27.4888H10C8.67392 27.4888 7.40215 26.962 6.46447 26.0243C5.52678 25.0866 5 23.8149 5 22.4888V10.4888C5 9.16269 5.52678 7.89092 6.46447 6.95324C7.40215 6.01555 8.67392 5.48877 10 5.48877H22C23.3261 5.48877 24.5979 6.01555 25.5355 6.95324C26.4732 7.89092 27 9.16269 27 10.4888V22.4888ZM24 9.98877C24 10.2854 23.912 10.5755 23.7472 10.8221C23.5824 11.0688 23.3481 11.2611 23.074 11.3746C22.7999 11.4881 22.4983 11.5178 22.2074 11.4599C21.9164 11.4021 21.6491 11.2592 21.4393 11.0494C21.2296 10.8397 21.0867 10.5724 21.0288 10.2814C20.9709 9.99043 21.0007 9.68883 21.1142 9.41474C21.2277 9.14066 21.42 8.90639 21.6666 8.74156C21.9133 8.57674 22.2033 8.48877 22.5 8.48877C22.8978 8.48877 23.2794 8.6468 23.5607 8.92811C23.842 9.20941 24 9.59094 24 9.98877Z" fill="#070604"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M17.5857 14.0675L14.5857 12.5675C14.4676 12.5087 14.3361 12.482 14.2044 12.4902C14.0727 12.4985 13.9455 12.5413 13.8357 12.6144L12.4585 13.5331C11.8263 13.1856 11.306 12.6653 10.9585 12.0331L11.8772 10.656C11.9503 10.5461 11.9932 10.4189 12.0014 10.2873C12.0096 10.1556 11.983 10.024 11.9241 9.90596L10.4241 6.90596C10.3619 6.7804 10.2658 6.67477 10.1467 6.60103C10.0276 6.5273 9.89016 6.48841 9.75005 6.48877C8.75549 6.48877 7.80166 6.88386 7.0984 7.58712C6.39514 8.29038 6.00005 9.24421 6.00005 10.2388C6.00253 12.426 6.87252 14.523 8.41916 16.0697C9.9658 17.6163 12.0628 18.4863 14.2501 18.4888C14.7425 18.4888 15.2301 18.3918 15.6851 18.2033C16.1401 18.0149 16.5535 17.7386 16.9017 17.3904C17.2499 17.0422 17.5261 16.6288 17.7146 16.1738C17.9031 15.7189 18.0001 15.2312 18.0001 14.7388C18.0002 14.5994 17.9614 14.4628 17.8882 14.3443C17.8151 14.2257 17.7103 14.1299 17.5857 14.0675ZM14.2501 16.9888C12.4605 16.9868 10.7447 16.275 9.47927 15.0095C8.21383 13.7441 7.50204 12.0284 7.50005 10.2388C7.49991 9.71857 7.68002 9.21439 8.00974 8.81203C8.33945 8.40967 8.79841 8.13398 9.30849 8.03189L10.3847 10.1881L9.4688 11.5513C9.40036 11.6539 9.3583 11.7719 9.34636 11.8947C9.33443 12.0175 9.35297 12.1414 9.40036 12.2553C9.93698 13.5307 10.9516 14.5453 12.2269 15.0819C12.3412 15.1314 12.466 15.1517 12.5901 15.1408C12.7141 15.13 12.8336 15.0885 12.9376 15.02L14.3072 14.1069L16.4635 15.1831C16.3606 15.6938 16.0837 16.153 15.6801 16.4823C15.2764 16.8115 14.771 16.9906 14.2501 16.9888ZM12.0001 2.73877C10.3167 2.7384 8.66201 3.17385 7.19691 4.00273C5.73182 4.83162 4.50628 6.02569 3.63959 7.46874C2.77289 8.91178 2.29457 10.5546 2.25117 12.2374C2.20777 13.9201 2.60077 15.5855 3.39193 17.0713L2.32787 20.2635C2.23973 20.5278 2.22693 20.8114 2.29093 21.0825C2.35492 21.3537 2.49316 21.6017 2.69016 21.7987C2.88717 21.9957 3.13514 22.1339 3.4063 22.1979C3.67745 22.2619 3.96107 22.2491 4.22537 22.161L7.41755 21.0969C8.72515 21.7924 10.174 22.1808 11.6541 22.2328C13.1343 22.2847 14.6068 21.9988 15.9599 21.3966C17.3131 20.7945 18.5112 19.892 19.4635 18.7577C20.4158 17.6234 21.0971 16.287 21.4558 14.8501C21.8145 13.4131 21.8411 11.9133 21.5336 10.4646C21.2261 9.01577 20.5926 7.65608 19.6812 6.48869C18.7698 5.3213 17.6044 4.37688 16.2735 3.72713C14.9426 3.07738 13.4811 2.73938 12.0001 2.73877ZM12.0001 20.7388C10.5497 20.7398 9.12483 20.3578 7.86943 19.6316C7.77751 19.5783 7.67532 19.5451 7.56962 19.5343C7.46391 19.5235 7.35712 19.5352 7.2563 19.5688L3.75005 20.7388L4.91912 17.2325C4.95281 17.1318 4.96473 17.025 4.95406 16.9193C4.94339 16.8136 4.91039 16.7114 4.85724 16.6194C3.94784 15.0471 3.58272 13.2187 3.81852 11.4177C4.05432 9.61678 4.87786 7.94397 6.16139 6.65882C7.44491 5.37368 9.11667 4.54802 10.9173 4.30995C12.718 4.07187 14.5469 4.43468 16.1203 5.3421C17.6937 6.24951 18.9237 7.65081 19.6194 9.3286C20.3152 11.0064 20.4378 12.8669 19.9683 14.6215C19.4987 16.3761 18.4633 17.9267 17.0226 19.0327C15.5818 20.1388 13.8164 20.7385 12.0001 20.7388Z" fill="#070604"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.contacts}>
                        <span className={styles.titleContacts}> اطلاعات تماس </span>

                        <div className={styles.phoneNumber}>
                            <div className={styles.callImage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                                <path d="M26.059 19.0583L20.5383 16.5845L20.5231 16.5774C20.2365 16.4549 19.9238 16.4057 19.6134 16.4343C19.303 16.463 19.0047 16.5685 18.7453 16.7415C18.7148 16.7617 18.6854 16.7836 18.6574 16.8071L15.8051 19.2388C13.9981 18.361 12.1324 16.5095 11.2547 14.7259L13.6899 11.8302C13.7133 11.8009 13.7356 11.7716 13.7567 11.7399C13.9259 11.4813 14.0286 11.1849 14.0556 10.8769C14.0826 10.569 14.033 10.2592 13.9113 9.9751V9.96104L11.4305 4.43096C11.2696 4.05979 10.993 3.75059 10.642 3.54952C10.291 3.34846 9.88437 3.26631 9.48282 3.31534C7.8949 3.52429 6.43733 4.30413 5.38235 5.5092C4.32738 6.71427 3.74714 8.26216 3.75001 9.86378C3.75001 19.1685 11.3203 26.7388 20.625 26.7388C22.2266 26.7416 23.7745 26.1614 24.9796 25.1064C26.1847 24.0515 26.9645 22.5939 27.1734 21.006C27.2226 20.6046 27.1406 20.198 26.9397 19.847C26.7389 19.496 26.4299 19.2193 26.059 19.0583ZM20.625 24.8638C16.6481 24.8594 12.8353 23.2777 10.0232 20.4656C7.2111 17.6535 5.62935 13.8407 5.62501 9.86378C5.6206 8.71943 6.03288 7.6126 6.78486 6.75C7.53683 5.88739 8.57708 5.32799 9.71134 5.17628C9.71088 5.18095 9.71088 5.18566 9.71134 5.19034L12.1723 10.6982L9.75001 13.5974C9.72542 13.6257 9.70309 13.6558 9.68321 13.6876C9.50686 13.9582 9.40341 14.2698 9.38288 14.5921C9.36235 14.9145 9.42543 15.2367 9.56603 15.5274C10.6277 17.6989 12.8156 19.8704 15.0106 20.931C15.3035 21.0702 15.6275 21.1311 15.951 21.1077C16.2745 21.0843 16.5864 20.9774 16.8563 20.7974C16.8863 20.7771 16.9153 20.7552 16.943 20.7317L19.7918 18.3013L25.2996 20.7681C25.2996 20.7681 25.309 20.7681 25.3125 20.7681C25.1626 21.9039 24.6041 22.9463 23.7413 23.7001C22.8786 24.454 21.7707 24.8676 20.625 24.8638Z" fill="white"/>
                                </svg>
                            </div>
                            <div className={styles.phoneNumberText}>
                                <span> شماره های تماس </span>
                                <span> ۰۲۱-۵۵۶۰۳۲۱۲۰ - ۰۹۱۹۰۰۱۰۰۱۸۷ </span>
                            </div>
                        </div>

                        <div className={styles.email}>
                            <div className={styles.emailImage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                                <path d="M26.25 6.11377H3.75C3.50136 6.11377 3.2629 6.21254 3.08709 6.38836C2.91127 6.56417 2.8125 6.80263 2.8125 7.05127V22.9888C2.8125 23.486 3.01004 23.963 3.36167 24.3146C3.71331 24.6662 4.19022 24.8638 4.6875 24.8638H25.3125C25.8098 24.8638 26.2867 24.6662 26.6383 24.3146C26.99 23.963 27.1875 23.486 27.1875 22.9888V7.05127C27.1875 6.80263 27.0887 6.56417 26.9129 6.38836C26.7371 6.21254 26.4986 6.11377 26.25 6.11377ZM23.8395 7.98877L15 16.0923L6.16055 7.98877H23.8395ZM25.3125 22.9888H4.6875V9.18291L14.366 18.0552C14.539 18.2139 14.7652 18.302 15 18.302C15.2348 18.302 15.461 18.2139 15.634 18.0552L25.3125 9.18291V22.9888Z" fill="white"/>
                                </svg>
                            </div>
                            <div className={styles.emailText}>
                                <span> ایمیل </span>
                                <span> Info@site.com </span>
                            </div>
                        </div>


                        <div className={styles.location}>
                            <div className={styles.locationImage}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                            <path d="M23.4375 26.7388H17.6414C18.6151 25.8694 19.5333 24.9398 20.3906 23.9556C23.6074 20.256 25.3125 16.356 25.3125 12.6763C25.3125 9.94122 24.226 7.3182 22.292 5.38423C20.3581 3.45026 17.735 2.36377 15 2.36377C12.265 2.36377 9.64193 3.45026 7.70796 5.38423C5.77399 7.3182 4.6875 9.94122 4.6875 12.6763C4.6875 16.356 6.38789 20.256 9.60938 23.9556C10.4667 24.9398 11.3849 25.8694 12.3586 26.7388H6.5625C6.31386 26.7388 6.0754 26.8375 5.89959 27.0134C5.72377 27.1892 5.625 27.4276 5.625 27.6763C5.625 27.9249 5.72377 28.1634 5.89959 28.3392C6.0754 28.515 6.31386 28.6138 6.5625 28.6138H23.4375C23.6861 28.6138 23.9246 28.515 24.1004 28.3392C24.2762 28.1634 24.375 27.9249 24.375 27.6763C24.375 27.4276 24.2762 27.1892 24.1004 27.0134C23.9246 26.8375 23.6861 26.7388 23.4375 26.7388ZM6.5625 12.6763C6.5625 10.4385 7.45145 8.29239 9.03379 6.71006C10.6161 5.12772 12.7622 4.23877 15 4.23877C17.2378 4.23877 19.3839 5.12772 20.9662 6.71006C22.5486 8.29239 23.4375 10.4385 23.4375 12.6763C23.4375 19.3829 16.9371 24.981 15 26.5044C13.0629 24.981 6.5625 19.3829 6.5625 12.6763ZM19.6875 12.6763C19.6875 11.7492 19.4126 10.8429 18.8975 10.072C18.3824 9.30118 17.6504 8.70037 16.7938 8.34558C15.9373 7.9908 14.9948 7.89797 14.0855 8.07884C13.1762 8.25971 12.341 8.70615 11.6854 9.36171C11.0299 10.0173 10.5834 10.8525 10.4026 11.7618C10.2217 12.6711 10.3145 13.6136 10.6693 14.4701C11.0241 15.3266 11.6249 16.0587 12.3958 16.5738C13.1666 17.0889 14.0729 17.3638 15 17.3638C16.2432 17.3638 17.4355 16.8699 18.3146 15.9908C19.1936 15.1118 19.6875 13.9195 19.6875 12.6763ZM12.1875 12.6763C12.1875 12.12 12.3525 11.5762 12.6615 11.1137C12.9705 10.6512 13.4098 10.2907 13.9237 10.0779C14.4376 9.86499 15.0031 9.80929 15.5487 9.91781C16.0943 10.0263 16.5954 10.2942 16.9887 10.6875C17.3821 11.0809 17.6499 11.582 17.7585 12.1276C17.867 12.6732 17.8113 13.2386 17.5984 13.7526C17.3855 14.2665 17.0251 14.7057 16.5625 15.0148C16.1 15.3238 15.5563 15.4888 15 15.4888C14.2541 15.4888 13.5387 15.1925 13.0113 14.665C12.4838 14.1376 12.1875 13.4222 12.1875 12.6763Z" fill="white"/>
                            </svg>
                            </div>
                            <div className={styles.locationText}>
                                <span> آدرس </span>
                                <span> میدان تجریش - خیابان سعدی -  پلاک ۲۹۱ - واحد ۱۲ </span>
                            </div>
                        </div>
                    </div>
            </div>

                    <div className={styles.securitySite}>
                        <span> تمام حقوق این سایت محفوظ است </span>
                    </div>
        </section>
    );
};

export default Footer;