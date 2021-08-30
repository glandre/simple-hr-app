import React from "react";
import { useAuth } from "../../contexts/auth";

const Login = () => {
  const { signin } = useAuth();
  const handleClick = async () => {
    await signin({
      username: "chessable",
      password: "chessable",
    });
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleClick}>Login</button>
    </div>
  );
};

export default Login;
