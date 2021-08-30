import React from "react";
import { useAuth } from "../../contexts/auth";
import LoginTemplate from "../templates/Login";

const Login = () => {
  const { signin } = useAuth();
  const handleSubmit = async (credentials) => {
    await signin(credentials);
  };

  return <LoginTemplate onSubmit={handleSubmit} />;
};

export default Login;
