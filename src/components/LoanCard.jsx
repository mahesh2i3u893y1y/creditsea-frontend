import React, { useEffect, useRef, useState } from "react";
import dots from "../assets/dots.png";
import profile from "../assets/profile.png";
import { useLocation } from "react-router";
import useFetchLoans from "../hooks/useFetchLoans";
import left from "../assets/left.png";
import right from "../assets/right.png";

const buttons = {
  pending: "#fec400",
  approved: "#1829c7",
  rejected: "#cc2929",
  verified: "#29cc97",
};

const LoanCard = ({ loans, permissions }) => {
  const { fetchLoans } = useFetchLoans();
  const [dropdownLoanId, setDropdownLoanId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRefs = useRef({});
  const location = useLocation();
  const itemsPerPage = 7;

  const handlePermissionSelect = async (loan, permission) => {
    const payload = {
      loanId: loan._id,
      status: permission,
    };

    console.log(payload);

    const apiUrl = location.pathname.includes("/verifier")
      ? "https://creditsea-backend-6.onrender.com/verifier/update-status"
      : "https://creditsea-backend-6.onrender.com/admin/update-status";

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      await fetchLoans();
      console.log("Response from server:", data);
    } catch (err) {
      console.error("Error updating loan status:", err);
    }

    setDropdownLoanId(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownLoanId &&
        dropdownRefs.current[dropdownLoanId] &&
        !dropdownRefs.current[dropdownLoanId].contains(event.target)
      ) {
        setDropdownLoanId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownLoanId]);

  // Pagination
  const totalLoans = loans.length;
  const totalPages = Math.ceil(totalLoans / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalLoans);
  const visibleLoans = loans.slice(startIdx, endIdx);

  return (
    <div className="flex flex-col w-full mt-5 flex-wrap">
      <div className="flex items-center w-[86%]">
        <p className="text-[12px] font-semibold ml-[4%]">Loan Officer</p>
        <p className="text-[12px] font-semibold ml-[26%]">Amount</p>
        <p className="text-[12px] font-semibold ml-[17%]">Date Applied</p>
        <p className="text-[12px] font-semibold ml-[17%]">Status</p>
      </div>

      {visibleLoans.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        visibleLoans.map((loan) => (
          <div key={loan._id} className="relative">
            <div className="flex justify-between items-center p-4 w-full border-t border-gray-700">
              <div className="flex gap-3 items-center">
                <img src={profile} alt="profile" className="w-10 h-10" />
                <div>
                  <p className="text-[12px]">{loan.name}</p>
                  <p className="text-[12px]">updated one day ago</p>
                </div>
              </div>

              <div>
                <p className="text-[12px]">{loan.amount}</p>
                <p className="text-[12px]">Not debt yet</p>
              </div>

              <div>
                <p className="text-[12px]">{loan.submittedDate}</p>
                <p className="text-[12px]">{loan.loanSubmittedAt}</p>
              </div>

              <div>
                <p
                  className="text-white text-[14px] font-semibold w-[100px] text-center rounded-2xl py-2 cursor-pointer"
                  style={{
                    backgroundColor: buttons[loan.status?.toLowerCase()],
                  }}
                >
                  {loan.status.toUpperCase()}
                </p>
              </div>

              <div
                className="relative"
                ref={(el) => (dropdownRefs.current[loan._id] = el)}
              >
                <img
                  src={dots}
                  alt="dots"
                  className={`w-5 h-5 ${
                    location.pathname === "/user"
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (location.pathname !== "/user") {
                      setDropdownLoanId(
                        dropdownLoanId === loan._id ? null : loan._id
                      );
                    }
                  }}
                />

                {dropdownLoanId === loan._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white font-poppins rounded shadow-lg z-10">
                    {permissions.map((permission, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePermissionSelect(loan, permission);
                        }}
                      >
                        {permission}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 pr-4 text-sm text-gray-700 font-poppins">
        <span className="px-4 py-1 bg-white ">
          {startIdx + 1}–{endIdx} of {totalLoans}
        </span>
        <button
          className="cursor-pointer"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <img src={left} alt="left" className="w-6 h-6" />
        </button>

        <button
          className="cursor-pointer"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <img src={right} alt="right" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default LoanCard;
