import React from "react";

import payment from "../assets/payments.png";
import home from "../assets/speedometer.png";
import budget from "../assets/note.png";
import card from "../assets/card.png";
import align from "../assets/align-justify.png";
import account from "../assets/account_circle.png";
import notifications from "../assets/notification.png";
import toggle from "../assets/toggle.png";
import message from "../assets/message.png";

const NavbarVerifier = () => {
  return (
    <div className="w-full flex justify-between items-center shadow-lg py-5 font-poppins ">
      <div className="flex gap-10">
        <h3 className="text-[#0A512F] text-[23px] font-[700] pl-[24px]  cursor-pointer">
          CREDIT APP
        </h3>
        <img src={align} alt="toggle" className="cursor-pointer ml-7" />
      </div>
      <div className="flex gap-4">
        <div className="flex justify-center items-center gap-2">
          <img src={home} alt="home" className="w-[32px] h-[23px]" />
          <p className="text-[#0A512F] text-[18px] font-[600]  cursor-pointer hover:underline">
            Home
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <img src={payment} alt="payments" className="w-[35px] h-[28px]" />
          <p className="text-[#0A512FB2] text-[17px] font-[500]  cursor-pointer hover:underline">
            Payments
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <img src={budget} alt="budget" className="w-[18px] h-[22px]" />
          <p className="text-[#0A512FB2] text-[17px] font-[500]  cursor-pointer hover:underline">
            Budget
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <img src={card} alt="card" className="w-[28px] h-[19px]" />
          <p className="text-[#0A512FB2] text-[17px] font-[500] cursor-pointer hover:underline">
            Card
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 pr-10">
        <img
          src={notifications}
          alt="notification"
          className="w-[27px] h-[29px]  cursor-pointer"
        />
        <img
          src={message}
          alt="message"
          className="w-[30px] h-[29px]  cursor-pointer"
        />
        <img
          src={account}
          alt="account"
          className="w-[32px] h-[32px]  cursor-pointer"
        />
        <p className="text-[17px] text-[#0A512F] font-[500]  cursor-pointer hover:underline">
          User
        </p>
        <img
          src={toggle}
          alt="toggle"
          className="w-[14px] h-[9px]  cursor-pointer"
        />
      </div>
    </div>
  );
};

export default NavbarVerifier;
