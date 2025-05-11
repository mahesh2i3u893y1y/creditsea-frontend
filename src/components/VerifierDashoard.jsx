import React from "react";
import borrowers from "../assets/Vector (4).png";
import loans from "../assets/Vector (5).png";
import repayments from "../assets/Vector (6).png";
import savingss from "../assets/Vector (12).png";
import cash from "../assets/cash.png";
import received from "../assets/received.png";
import LoanCard from "./LoanCard";
import useFetchLoans from "../hooks/useFetchLoans";
import useFetchStatatics from "../hooks/useFetchStatatics";
import Statastics from "./Statastics";
import RepaymentsBarChart from "./RepaymentsBarGraph";
import ChartGraph from "./CharGraph";

const VerifierDashoard = ({ permissions }) => {
  const { overview,loadingOverview,errorOverview } = useFetchStatatics();

  const { allLoans } = useFetchLoans();
  

  if (loadingOverview) {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner"></div> {/* Your custom spinner */}
      </div>
    );
  }
  if (errorOverview) return <p>Error: {errorOverview}</p>;

//   console.log(overview)
  const {
    // activeUsers,
    cashDistributed,
    cashReceived,
    repaidLoans,
    savings,
    totalBorrowers,
    totalLoans,
  } = overview;
//   console.log("overview", overview);
  return (
    <>
      <div className="flex gap-10 flex-wrap font-poppins">
        <div className="flex justify-center items-center ">
          <div className="bg-[#0d361f] h-20 w-25 flex justify-center items-center">
            <img src={loans} alt="loans" className="w-15 h-10 object-contain" />
          </div>
          <div className="h-20 bg-white w-50 pl-10 flex flex-col justify-between py-2">
            <p className="font-semibold text-2xl">{totalLoans}</p>
            <p className="font-semibold text-md">LOANS</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-[#0d361f] h-20 w-25 flex justify-center items-center">
            <img
              src={borrowers}
              alt="loans"
              className="w-15 h-10 object-contain"
            />
          </div>
          <div className="h-20 bg-white w-50 pl-10 flex flex-col justify-between py-2">
            <p className="font-semibold text-2xl">{totalBorrowers}</p>
            <p className="font-semibold text-md">BORROWERS</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-[#0d361f] h-20 w-25 flex justify-center items-center">
            <img src={cash} alt="cash" className="w-15 h-10 object-contain" />
          </div>
          <div className="h-20 bg-white w-50 pl-10 flex flex-col justify-between py-2">
            <p className="font-semibold text-2xl">{cashDistributed}</p>
            <p className="font-semibold text-md">CASH DISBURSED</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-[#0d361f] h-20 w-25 flex justify-center items-center">
            <img
              src={savingss}
              alt="loans"
              className="w-15 h-10 object-contain"
            />
          </div>
          <div className="h-20 bg-white w-50 pl-10 flex flex-col justify-between py-2">
            <p className="font-semibold text-2xl">{Math.round(savings)}</p>
            <p className="font-semibold text-md">SAVINGS</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-[#0d361f] h-20 w-25 flex justify-center items-center">
            <img
              src={repayments}
              alt="savings"
              className="w-15 h-10 object-contain"
            />
          </div>
          <div className="h-20 bg-white w-50 pl-10 flex flex-col justify-between py-2">
            <p className="font-semibold text-2xl">{repaidLoans}</p>
            <p className="font-semibold text-md">REPAID LOANS</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-[#0d361f] h-20 w-25 flex justify-center items-center">
            <img
              src={received}
              alt="loans"
              className="w-15 h-10 object-contain"
            />
          </div>
          <div className="h-20 bg-white w-50 pl-10 flex flex-col justify-between py-2">
            <p className="font-semibold text-2xl">{cashReceived}</p>
            <p className="font-semibold text-md">CASH RECEIVED</p>
          </div>
        </div>
      </div>
      <div className="bg-white mt-10 py-10 w-[90%]">
        <LoanCard loans={allLoans} permissions={permissions} />

        <Statastics/>
        <RepaymentsBarChart/>
        <ChartGraph/>
      </div>
    </>
  );
};

export default VerifierDashoard;
