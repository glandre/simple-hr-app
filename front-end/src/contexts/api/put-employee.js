import React, { useCallback, useState } from "react";
import { axiosInstance } from "./axios-instance";

const PutEmployeeContext = React.createContext();

function PutEmployeeProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const putEmployees = useCallback(async (id, payload) => {
    try {
      setLoading(true);

      await axiosInstance({
        method: "PUT",
        url: `/employees/${id}`,
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
    putEmployees,
    hasLoaded,
    loading,
  };

  return (
    <PutEmployeeContext.Provider value={value}>
      {children}
    </PutEmployeeContext.Provider>
  );
}

/**
 * @returns {{
 *  error: Error
 *  putEmployees: (id: number, payload: object) => Promise<void>
 *  hasLoaded: boolean
 *  loading: boolean
 * }}
 */
function usePutEmployee() {
  const context = React.useContext(PutEmployeeContext);

  if (context === undefined) {
    throw new Error("usePutEmployee must be used within a PutEmployeeContext");
  }

  return context;
}

export { PutEmployeeProvider, usePutEmployee };
