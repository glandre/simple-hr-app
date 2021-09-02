import React, { useCallback, useState } from "react";
import { axiosInstance } from "./axios-instance";

const GetEmployeesContext = React.createContext();

function GetEmployeesProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const getEmployees = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axiosInstance({
        method: "GET",
        url: "/employees",
      });

      setEmployees(response.data || []);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const value = {
    employees,
    error,
    getEmployees,
    hasLoaded,
    loading,
  };

  return (
    <GetEmployeesContext.Provider value={value}>
      {children}
    </GetEmployeesContext.Provider>
  );
}

/**
 * @returns {{
 *  employees: object[]
 *  error: Error
 *  getEmployees: () => Promise<void>
 *  hasLoaded: boolean
 *  loading: boolean
 * }}
 */
function useGetEmployees() {
  const context = React.useContext(GetEmployeesContext);

  if (context === undefined) {
    throw new Error(
      "useGetEmployees must be used within a GetEmployeesContext"
    );
  }

  return context;
}

export { GetEmployeesProvider, useGetEmployees };
