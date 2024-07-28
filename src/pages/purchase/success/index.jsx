import React from "react";

import PaymentMessage from "@/components/paymentMessage";

const Success = () => {
  return (
    <PaymentMessage
      imagePayment="/assets/icons/correct.png"
      textPayment="خرید با موفقیت انجام شد :)"
      linkPayment="/dashboard"
      linkTitlePayment="رفتن به حساب کاربری"
      seconds={15}
    />
  );
};

export default Success;
