// hooks/useFetchLoans.js
import { useEffect, useState} from "react";

const useFetchLoans = () => {
  const [allLoans, setAllLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLoans = async () => {
    try {
      const res = await fetch("https://creditsea-backend-8.onrender.com/all-loans", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch active loans");

      const result = await res.json();

    
      setAllLoans(result.loans);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchLoans()
  },[allLoans])



  return { allLoans, fetchLoans, loading, error };
};

export default useFetchLoans;
