import React, {  useState } from "react";

import money from "../assets/money.png";
import dash from "../assets/dash.png";
import currency from "../assets/currency.png";
import LoanForm from "./LoanForm";

// Utility 


export const User = () => {
  const [showLoanModal, setShowLoanModal] = useState(false);
  

  

  return (
    <div className="flex justify-around pt-20 font-poppins w-[80%] mx-auto">
      {showLoanModal && <LoanForm onClose={() => setShowLoanModal(false)} />}
      <div className="flex gap-3 h-[69px]">
        <div className="bg-[#6B9908] w-[80px] h-full flex flex-col justify-center items-center p-2 relative">
          <img
            src={dash}
            alt="dash"
            className="absolute bottom-12 left-12 w-[21px] h-[5px]"
          />
          <img src={money} alt="currency" className="w-[44px] h-[33px]" />
        </div>
        <div className="flex flex-col justify-center h-full px-2">
          <p className="text-[12px] font-[600] text-[#6B9908]">DEFICIT</p>
          <div className="flex items-center gap-1">
            <img src={currency} alt="money" className="w-[20px] h-[27px]" />
            <p className="text-[30px] font-[700] text-[#6B9908]">0.0</p>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => setShowLoanModal(true)}
          className="bg-[#0A512F30] text-white text-[13px] py-3 px-5 rounded-lg font-semibold cursor-pointer"
        >
          GET A Loan
        </button>
      </div>
    </div>
  );
};
