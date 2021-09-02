import React, { useCallback, useState } from "react";
import { axiosInstance } from "./axios-instance";

const PostEmployeesContext = React.createContext();

function PostEmployeesProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const postEmployees = useCallback(async (payload) => {
    try {
      setLoading(true);

      await axiosInstance({
        method: "POST",
        url: "/employees",
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
    postEmployees,
    hasLoaded,
    loading,
  };

  return (
    <PostEmployeesContext.Provider value={value}>
      {children}
    </PostEmployeesContext.Provider>
  );
}

/**
 * @returns {{
 *  error: Error
 *  postEmployees: () => Promise<void>
 *  hasLoaded: boolean
 *  loading: boolean
 * }}
 */
function usePostEmployees() {
  const context = React.useContext(PostEmployeesContext);

  if (context === undefined) {
    throw new Error(
      "usePostEmployees must be used within a PostEmployeesContext"
    );
  }

  return context;
}

export { PostEmployeesProvider, usePostEmployees };
