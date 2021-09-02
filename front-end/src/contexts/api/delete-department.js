import React, { useCallback, useState } from "react";
import { axiosInstance } from "./axios-instance";

const DeleteDepartmentContext = React.createContext();

function DeleteDepartmentProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const deleteDepartment = useCallback(async (id) => {
    try {
      setLoading(true);

      await axiosInstance({
        method: "DELETE",
        url: `/departments/${id}`,
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
    deleteDepartment,
    hasLoaded,
    loading,
  };

  return (
    <DeleteDepartmentContext.Provider value={value}>
      {children}
    </DeleteDepartmentContext.Provider>
  );
}

/**
 * @returns {{
 *  error: Error
 *  deleteDepartment: (id: number) => Promise<void>
 *  hasLoaded: boolean
 *  loading: boolean
 * }}
 */
function useDeleteDepartment() {
  const context = React.useContext(DeleteDepartmentContext);

  if (context === undefined) {
    throw new Error(
      "DeleteostDepartment must be used within a DeleteDepartmentContext"
    );
  }

  return context;
}

export { DeleteDepartmentProvider, useDeleteDepartment };
