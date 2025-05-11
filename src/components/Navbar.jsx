import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import payment from "../assets/payments.png";
import home from "../assets/speedometer.png";
import budget from "../assets/note.png";
import card from "../assets/card.png";
import account from "../assets/account_circle.png";
import notifications from "../assets/notification.png";
import toggle from "../assets/toggle.png";
import message from "../assets/message.png";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState("User");

  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    if (location.pathname.includes("/admin")) {
      setSelectedPortal("Admin");
    } else if (location.pathname.includes("/verifier")) {
      setSelectedPortal("Verifier");
    } else {
      setSelectedPortal("User");
    }
  }, [location.pathname]);

  const handleSelect = (portal) => {
    setShowDropdown(false);
    navigate(`/${portal}`);
  };

  return (
    <div className="w-full relative flex justify-between items-center shadow-lg py-5 font-poppins">
      <h3 className="text-[#0A512F] text-[23px] font-[700] pl-[24px] cursor-pointer">
        CREDIT APP
      </h3>

      <div className="flex gap-4">
        <div className="flex justify-center items-center gap-2">
          <img src={home} alt="home" className="w-[32px] h-[23px]" />
          <p className="text-[#0A512F] text-[18px] font-[600] cursor-pointer hover:underline">
            Home
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <img src={payment} alt="payments" className="w-[35px] h-[28px]" />
          <p className="text-[#0A512FB2] text-[17px] font-[500] cursor-pointer hover:underline">
            Payments
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <img src={budget} alt="budget" className="w-[18px] h-[22px]" />
          <p className="text-[#0A512FB2] text-[17px] font-[500] cursor-pointer hover:underline">
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

      <div className="flex justify-center items-center gap-4 pr-10 relative">
        <img
          src={notifications}
          alt="notification"
          className="w-[27px] h-[29px] cursor-pointer"
        />
        <img
          src={message}
          alt="message"
          className="w-[30px] h-[29px] cursor-pointer"
        />
        <img
          src={account}
          alt="account"
          className="w-[32px] h-[32px] cursor-pointer"
        />

        {/* Dynamic  */}
        <p className="text-[17px] text-[#0A512F] font-[500] cursor-pointer hover:underline">
          {selectedPortal}
        </p>

        {/*  Dropdown */}
        <button onClick={() => setShowDropdown(!showDropdown)}>
          <img
            src={toggle}
            alt="toggle"
            className="w-[14px] h-[9px] cursor-pointer"
          />
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute top-14 right-0 bg-white border border-gray-200 shadow-md rounded-md z-50">
            <ul className="flex flex-col">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect("user")}
              >
                User Portal
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect("admin")}
              >
                Admin Portal
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect("verifier")}
              >
                Verifier Portal
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
