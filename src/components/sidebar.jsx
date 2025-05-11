import React from 'react';
import speed from "../assets/navspeed.png";
import borrowers from "../assets/Vector (4).png";
import loans from "../assets/Vector (5).png";
import repayments from "../assets/Vector (6).png";
import parameters from "../assets/Vector (7).png";
import accounting from "../assets/Vector (8).png";
import reports from "../assets/Vector (9).png";
import collateral from "../assets/Vector (10).png";
import configuration from "../assets/Vector (11).png";
import savings from "../assets/Vector (12).png";
import expenses from "../assets/Vector (13).png";
import signature from "../assets/Vector (14).png";
import investor from "../assets/Vector (15).png";
import calender from "../assets/Vector (16).png";
import settings from "../assets/Vector (17).png";
import signout from "../assets/Vector (18).png";

const elements = [
  { name: "Dashboard", image: speed },
  { name: "Borrowers", image: borrowers },
  { name: "Loans", image: loans },
  { name: "Repayments", image: repayments },
  { name: "Loan Parameters", image: parameters },
  { name: "Accounting", image: accounting },
  { name: "Reports", image: reports },
  { name: "Collateral", image: collateral },
  { name: "Access Configuration", image: configuration },
  { name: "Savings", image: savings },
  { name: "Expenses", image: expenses },
  { name: "E-signature", image: signature },
  { name: "Investor Accounts", image: investor },
  { name: "Calendar", image: calender },
  { name: "Settings", image: settings },
  { name: "Sign Out", image: signout },
];

const Sidebar = () => {
  return (
    <div className="w-64  bg-[#0d361f] p-4 shadow-md font-poppins">
      <ul className="space-y-4">
        {elements.map((item, index) => (
          <li key={index} className="flex items-center shadow-md gap-3 hover:bg-[#1d362821] p-2 rounded cursor-pointer">
            <img src={item.image} alt={item.name} className="w-7 h-7 object-contain" />
            <span className="text-white font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
