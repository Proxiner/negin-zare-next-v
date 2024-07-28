import React from 'react';

import PaymentMessage from "@/components/paymentMessage";

const Index = () => {
    return (
        <div>
            <>
                <PaymentMessage 
                    imagePayment="/assets/icons/correct.png"
                    textPayment ="خرید با موفقیت انجام شد :)"
                    linkPayment="/dashbord"
                    linkTitlePayment = "رفتن به حساب کاربری"
                    seconds={15}
                />
            </>
        </div>
    );
};

export default Index;