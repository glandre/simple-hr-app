import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../../contexts/auth";

const PublicRoute = ({ children, ...rest }) => {
  const { isLoggedIn } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
