import { useEffect, useState } from "react";

const API_BASE = "https://creditsea-backend-6.onrender.com";

const useFetchStatatics = () => {
  const [overview, setOverview] = useState(null);
  const [loadingOverview, setLoading] = useState(true);
  const [errorOverview, setError] = useState(null);

  const fetchOverview = async () => {
    try {
      const res = await fetch(`${API_BASE}/statistics/summary`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setOverview(data);
    } catch (err) {
      setError(err.message || "Failed to fetch overview stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []); // ✅ Fix: run only on mount

  return { overview, loadingOverview, errorOverview, refetch: fetchOverview };
};

export default useFetchStatatics;
