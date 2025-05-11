import { useEffect, useState } from "react";

const API_BASE = "https://creditsea-backend-8.onrender.com";

const useMonthlyStats = () => {
  const [monthlyData, setMonthlyData] = useState(null);
  const [loadingOverview, setLoading] = useState(true);
  const [errorOverview, setError] = useState(null);

  const fetchMonthlyStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/statistics/monthly`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setMonthlyData(data);
    } catch (err) {
      setError(err.message || "Failed to fetch overview stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyStats();
  }, []); // ✅ Fix: run only on mount

  return { monthlyData, loadingOverview, errorOverview, refetch: fetchMonthlyStats };
};

export default useMonthlyStats;
