import React from "react";

import PaymentMessage from "@/components/paymentMessage";

const Failed = () => {
  return (
    <PaymentMessage
      imagePayment="/assets/icons/error.png"
      textPayment="خرید با شکست مواجه شد :("
      statusPayment="در صورت کسر وجه تا ۷۲ ساعت آینده برگشت میخورد."
      linkPayment="/cart"
      linkTitlePayment="بازگشت به سبد خرید"
      seconds={15}
    />
  );
};

export default Failed;
