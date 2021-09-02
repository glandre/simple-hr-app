import React, { useCallback, useState } from "react";
import { axiosInstance } from "./axios-instance";

const DeleteEmployeeContext = React.createContext();

function DeleteEmployeeProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const deleteEmployee = useCallback(async (id) => {
    try {
      setLoading(true);

      await axiosInstance({
        method: "DELETE",
        url: `/employees/${id}`,
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
    deleteEmployee,
    hasLoaded,
    loading,
  };

  return (
    <DeleteEmployeeContext.Provider value={value}>
      {children}
    </DeleteEmployeeContext.Provider>
  );
}

/**
 * @returns {{
 *  error: Error
 *  deleteEmployee: (id: number) => Promise<void>
 *  hasLoaded: boolean
 *  loading: boolean
 * }}
 */
function useDeleteEmployee() {
  const context = React.useContext(DeleteEmployeeContext);

  if (context === undefined) {
    throw new Error(
      "DeleteostEmployee must be used within a DeleteEmployeeContext"
    );
  }

  return context;
}

export { DeleteEmployeeProvider, useDeleteEmployee };
