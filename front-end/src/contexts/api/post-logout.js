import React, { useCallback, useState } from "react";
// import { axiosInstance } from "./axios-instance";

const PostLogoutContext = React.createContext();

const fakeLogout = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

function PostLogoutProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const postLogout = useCallback(async () => {
    try {
      setLoading(true);

      // const response = await axiosInstance({
      //   method: "POST",
      //   url: "/login",
      // });

      await fakeLogout();
      setError(null);

      return true;
    } catch (error) {
      setError(error);
      return false;
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const value = {
    error,
    postLogout,
    hasLoaded,
    loading,
  };

  return (
    <PostLogoutContext.Provider value={value}>
      {children}
    </PostLogoutContext.Provider>
  );
}

/**
 * @returns {{
 *  user: object
 *  error: Error
 *  postLogout: () => Promise<boolean>
 *  hasLoaded: boolean
 *  loading: boolean
 * }}
 */
function usePostLogout() {
  const context = React.useContext(PostLogoutContext);

  if (context === undefined) {
    throw new Error("usePostLogout must be used within a PostLogoutContext");
  }

  return context;
}

export { PostLogoutProvider, usePostLogout };
