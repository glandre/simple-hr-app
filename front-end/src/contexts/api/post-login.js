import React, { useCallback, useState } from "react";
// import { axiosInstance } from "./axios-instance";

const PostLoginContext = React.createContext();

const fakeLogin = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ username });
    }, 500);
  });
};

function PostLoginProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const postLogin = useCallback(async (payload) => {
    try {
      setLoading(true);

      // const response = await axiosInstance({
      //   method: "POST",
      //   url: "/login",
      // });

      const result = await fakeLogin(payload);

      setUser(result);
      setError(null);
      return result;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const value = {
    user,
    error,
    postLogin,
    hasLoaded,
    loading,
  };

  return (
    <PostLoginContext.Provider value={value}>
      {children}
    </PostLoginContext.Provider>
  );
}

/**
 * @returns {{
 *  user: object
 *  error: Error
 *  postLogin: () => Promise<void>
 *  hasLoaded: boolean
 *  loading: boolean
 * }}
 */
function usePostLogin() {
  const context = React.useContext(PostLoginContext);

  if (context === undefined) {
    throw new Error("usePostLogin must be used within a PostLoginContext");
  }

  return context;
}

export { PostLoginProvider, usePostLogin };
