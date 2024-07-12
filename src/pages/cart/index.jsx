import React, { useEffect } from "react";

function Cart() {
  
  useEffect(()=>{
    document.title = "نگین | سبد خرید 💄";

    if (localStorage.getItem("token") === null) {
      setShowMessage("token expired");
    }
  },[])

  return (
    <div>
      
    </div>
  );
}

export default Cart;
