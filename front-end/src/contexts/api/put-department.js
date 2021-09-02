import React, { useCallback, useState } from "react";
import { axiosInstance } from "./axios-instance";

const PutDepartmentContext = React.createContext();

function PutDepartmentProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const putDepartments = useCallback(async (id, payload) => {
    try {
      setLoading(true);

      await axiosInstance({
        method: "PUT",
        url: `/departments/${id}`,
        data: payload,
      });

      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const value = {
    error,
    putDepartments,
    hasLoaded,
    loading,
  };

  return (
    <PutDepartmentContext.Provider value={value}>
      {children}
    </PutDepartmentContext.Provider>
  );
}

/**
 * @returns {{
 *  error: Error
 *  putDepartments: (id: number, payload: object) => Promise<void>
 *  hasLoaded: boolean
 *  loading: boolean
 * }}
 */
function usePutDepartment() {
  const context = React.useContext(PutDepartmentContext);

  if (context === undefined) {
    throw new Error(
      "usePutDepartment must be used within a PutDepartmentContext"
    );
  }

  return context;
}

export { PutDepartmentProvider, usePutDepartment };
