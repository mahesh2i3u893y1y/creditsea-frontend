import React, { useEffect, useState } from "react";

import searchPng from "../assets/search.png";
import sort from "../assets/sort.png";
import filter from "../assets/filter.png";
import LoanCard from "./LoanCard";

const UserLoans = () => {
  const [search, setSearch] = useState("");
  const [myLoans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyLoans = async () => {
    try {
      const res = await fetch("https://creditsea-backend-6.onrender.com/my-loans", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await res.json();
      setLoans(result.loans);
    } catch (err) {
      console.error("Failed to fetch loans", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMyLoans();
    }, 2000); // Calls getMyLoans every 2 seconds

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if(!myLoans) return <p>...Loading loans</p>

  //   console.log("local storage", user);
  return (
    <div className="flex flex-col justify-center items-center mt-10 w-[70%] mx-auto font-poppins">
      <div className="flex justify-between items-center w-[70%]">
        <div className="bg-[#6B99081A] text-center w-full py-2 border-r-[1px] border-gray-400">
          <p>Borrow Cash</p>
        </div>
        <div className="bg-gray-100 w-full text-center  py-2 border-r-[1px] border-gray-400">
          <p>Transact</p>
        </div>
        <div className="bg-gray-100 w-full text-center py-2 ">
          <p>Deposit Cash</p>
        </div>
      </div>

      <div className="w-[70%] flex gap-2 justify-center items-center border-gray-300 border-1 py-2 px-2 rounded-md mt-10">
        <div>
          <img src={searchPng} alt="search" className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="search for loans"
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full mt-10 bg-white py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold px-5">Applied Loans</h2>
          <div className="flex gap-4 px-5">
            <div className="flex gap-2">
              <img src={sort} alt="sort" className="" />
              <p>Sort</p>
            </div>
            <div className="flex gap-2">
              <img src={filter} alt="filter" className="" />
              <p>Filter</p>
            </div>
          </div>
        </div>
        {loading ? (
          <p className="text-center mt-4 text-gray-500">Loading...</p>
        ) : (
          <LoanCard loans={myLoans} />
        )}
      </div>
    </div>
  );
};

export default UserLoans;
