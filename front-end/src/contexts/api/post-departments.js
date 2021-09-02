import React, { useCallback, useState } from "react";
import { axiosInstance } from "./axios-instance";

const PostDepartmentsContext = React.createContext();

function PostDepartmentsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const postDepartments = useCallback(async (payload) => {
    try {
      setLoading(true);

      await axiosInstance({
        method: "POST",
        url: "/departments",
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
    postDepartments,
    hasLoaded,
    loading,
  };

  return (
    <PostDepartmentsContext.Provider value={value}>
      {children}
    </PostDepartmentsContext.Provider>
  );
}

/**
 * @returns {{
 *  error: Error
 *  postDepartments: () => Promise<void>
 *  hasLoaded: boolean
 *  loading: boolean
 * }}
 */
function usePostDepartments() {
  const context = React.useContext(PostDepartmentsContext);

  if (context === undefined) {
    throw new Error(
      "usePostDepartments must be used within a PostDepartmentsContext"
    );
  }

  return context;
}

export { PostDepartmentsProvider, usePostDepartments };
