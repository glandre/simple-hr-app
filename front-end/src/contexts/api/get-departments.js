import React, { useCallback, useState } from "react";
import { axiosInstance } from "./axios-instance";

const GetDepartmentsContext = React.createContext();

function GetDepartmentsProvider({ children }) {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const getDepartments = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axiosInstance({
        method: "GET",
        url: "/departments",
      });

      setDepartments(response.data?.departments || []);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const value = {
    departments,
    error,
    getDepartments,
    hasLoaded,
    loading,
  };

  return (
    <GetDepartmentsContext.Provider value={value}>
      {children}
    </GetDepartmentsContext.Provider>
  );
}

/**
 * @returns {{
 *  departments: object[]
 *  error: Error
 *  getDepartments: () => Promise<void>
 *  hasLoaded: boolean
 *  loading: boolean
 * }}
 */
function useGetDepartments() {
  const context = React.useContext(GetDepartmentsContext);

  if (context === undefined) {
    throw new Error(
      "useGetDepartments must be used within a GetDepartmentsContext"
    );
  }

  return context;
}

export { GetDepartmentsProvider, useGetDepartments };
