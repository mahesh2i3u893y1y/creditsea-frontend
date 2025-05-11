// components/LoanForm.jsx
import React, { useState } from "react";
import useUserLoans from "../hooks/useUserLoans";


const LoanForm = ({ onClose }) => {
    const { refreshLoans } = useUserLoans();
  const [form, setForm] = useState({
    name: "",
    amount: "",
    tenure: "",
    employmentStatus: "",
    loanReason: "",
    employmentAddress: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const userId = JSON.parse(localStorage.getItem("user"))

  const data = {...form,userId:userId.id}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://creditsea-backend-6.onrender.com/apply-loan", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials: "include",
        body:JSON.stringify(data)
    })

    const result = await res.json()
    await refreshLoans()
    console.log("loan result",result)
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-poppins p-[10%]">
      <div className="bg-white p-6 rounded-lg w-[75%]  relative ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl cursor-pointer"
        >
          &times;
        </button>
        <h1 className="text-xl font-bold mb-6 text-start pl-20">
          APPLY FOR THE LOAN
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 gap-5 flex justify-center items-center flex-wrap"
        >
          <div className="w-[40%]">
            <label className="block text-sm font-medium mb-1">
              Full name as it appear on bank account
            </label>
            <input
              name="name"
              placeholder="Full name as it appear on bank account"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded outline-none"
              required
            />
          </div>
          <div className="w-[40%]">
            <label className="block text-sm font-medium mb-1">
              How much do you need?
            </label>
            <input
              type="number"
              name="amount"
              placeholder="How much do you need?"
              value={form.amount}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded outline-none"
              required
            />
          </div>
          <div className="w-[40%]">
            <label className="block text-sm font-medium mb-1">
              Loan tenure (in months)
            </label>
            <input
              type="number"
              name="tenure"
              placeholder="Enter tenure in months"
              value={form.tenure}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded outline-none"
              required
            />
          </div>
          <div className="w-[40%]">
            <label className="block text-sm font-medium mb-1">
              Employment Status
            </label>
            <select
              name="employmentStatus"
              value={form.employmentStatus}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded outline-none"
              required
            >
              <option value="">Select status</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-employed</option>
              <option value="unemployed">Unemployed</option>
            </select>
          </div>
          <div className="w-[40%]">
            <label className="block text-sm font-medium mb-1">
              Reason for loan
            </label>
            <textarea
              name="loanReason"
              placeholder="Reason for loan"
              value={form.loanReason}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded outline-none"
              rows={3}
              required
            />
          </div>
          <div className="w-[40%]">
            <label className="block text-sm font-medium mb-1">
              Employment Address
            </label>
            <textarea
              name="employmentAddress"
              placeholder="Enter workplace address"
              value={form.employmentAddress}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded outline-none"
              rows={3}
              required
            />
          </div>

          <div className="w-[40%]">
            <input
              type="radio"
              id="acceptTerms"
              name="agreement1"
              className="mx-2"
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-700">
              I have read the{" "}
              <span className="font-semibold text-green-700">
                important information
              </span>{" "}
              and accept that by completing the application I will be bound by
              the terms.
            </label>
          </div>

          <div className="w-[40%] gap-3  ">
            <input
              type="radio"
              id="infoDisclosure"
              name="agreement2"
              className="mx-2"
            />
            <label htmlFor="infoDisclosure" className="text-sm text-gray-700">
              Any personal and credit information obtained may be disclosed from
              time to time to other lenders, credit bureaus or other credit
              reporting agencies.
            </label>
          </div>
          <button
            type="submit"
            className="w-[30%] cursor-pointer bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
