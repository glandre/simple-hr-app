import React, { useCallback, useEffect, useState } from "react";
import { usePostLogin } from "../api/post-login";
import { usePostLogout } from "../api/post-logout";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const {
    user: postLoginUser,
    error: signinError,
    hasLoaded: signinFinished,
    loading: signinInProgress,
    postLogin: signin,
  } = usePostLogin();

  useEffect(() => {
    setUser(postLoginUser);
  }, [postLoginUser]);

  const {
    error: signoutError,
    hasLoaded: signoutFinished,
    loading: signoutInProgress,
    postLogout,
  } = usePostLogout();

  const error = signinError || signoutError;

  const signout = useCallback(async () => {
    const success = await postLogout();
    if (success) {
      setUser(null);
    }
  }, [postLogout]);

  const value = {
    user,
    error,
    signin,
    signout,
    signinFinished,
    signinInProgress,
    signoutFinished,
    signoutInProgress,
    isLoggedIn: Boolean(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * @returns {{
 *  user: object
 *  error: Error
 *  signin: (payload: { username: string, password: string }) => Promise<void>
 *  signout: () => Promise<void>
 *  signinInProgress: boolean
 *  signinFinished: boolean
 *  signoutInProgress: boolean
 *  signoutFinished: boolean
 *  isLoggedIn: boolean
 * }}
 */
function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContext");
  }

  return context;
}

export { AuthProvider, useAuth };
