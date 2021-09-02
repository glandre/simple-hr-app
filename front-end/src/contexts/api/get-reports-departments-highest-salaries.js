import React, { useCallback, useState } from "react";
import { axiosInstance } from "./axios-instance";

const GetReportDepartmentHighestSalaries = React.createContext();

function GetReportDepartmentHighestSalariesProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const getReportDepartmentHighestSalaries = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axiosInstance({
        method: "GET",
        url: "/reports/departments/highest-salaries",
      });

      setData(response.data || []);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const value = {
    data,
    error,
    getReportDepartmentHighestSalaries,
    hasLoaded,
    loading,
  };

  return (
    <GetReportDepartmentHighestSalaries.Provider value={value}>
      {children}
    </GetReportDepartmentHighestSalaries.Provider>
  );
}

/**
 * @returns {{
 *  data: object[]
 *  error: Error
 *  getReportDepartmentHighestSalaries: () => Promise<void>
 *  hasLoaded: boolean
 *  loading: boolean
 * }}
 */
function useGetReportDepartmentHighestSalaries() {
  const context = React.useContext(GetReportDepartmentHighestSalaries);

  if (context === undefined) {
    throw new Error(
      "useGetReportDepartmentHighestSalaries must be used within a GetReportDepartmentHighestSalaries"
    );
  }

  return context;
}

export {
  GetReportDepartmentHighestSalariesProvider,
  useGetReportDepartmentHighestSalaries,
};
