import React, { useCallback, useState } from "react";
import { axiosInstance } from "./axios-instance";

const GetReportDepartmentsWithOver = React.createContext();

function GetReportDepartmentsWithOverProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const getReportDepartmentsWithOver = useCallback(
    async (numberOfEmployees, annualSalary) => {
      try {
        setLoading(true);

        const response = await axiosInstance({
          method: "GET",
          url: `/reports/departments/with/${numberOfEmployees}/over/${annualSalary}`,
        });

        setData(response.data || []);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        setHasLoaded(true);
      }
    },
    []
  );

  const value = {
    data,
    error,
    getReportDepartmentsWithOver,
    hasLoaded,
    loading,
  };

  return (
    <GetReportDepartmentsWithOver.Provider value={value}>
      {children}
    </GetReportDepartmentsWithOver.Provider>
  );
}

/**
 * @returns {{
 *  data: object[]
 *  error: Error
 *  getReportDepartmentsWithOver: (numberOfEmployees: number, annualSalary: number) => Promise<void>
 *  hasLoaded: boolean
 *  loading: boolean
 * }}
 */
function useGetReportDepartmentsWithOver() {
  const context = React.useContext(GetReportDepartmentsWithOver);

  if (context === undefined) {
    throw new Error(
      "useGetReportDepartmentsWithOver must be used within a GetReportDepartmentsWithOver"
    );
  }

  return context;
}

export {
  GetReportDepartmentsWithOverProvider,
  useGetReportDepartmentsWithOver,
};
