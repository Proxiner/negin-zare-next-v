import React from 'react';

import PaymentMessage from "@/components/paymentMessage";

const Index = () => {
    return (
        <div>
            <>
                <PaymentMessage 
                    imagePayment="/assets/icons/correct.png"
                    textPayment ="خرید با موفقیت انجام شد :)"
                    statusPayment =" "
                    linkPayment="/cart"
                    linkTitlePayment = "رفتن به حساب کاربری"
                />
            </>
        </div>
    );
};

export default Index;