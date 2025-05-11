import { useEffect, useState } from "react";

// hooks/useUserLoans.js
const useUserLoans = () => {
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
    getMyLoans();
  }, [myLoans]);

  return { myLoans, loading, refreshLoans: getMyLoans };
};

export default useUserLoans;
