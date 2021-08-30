import {
  Button,
  Paper as MuiPaper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import styled from "styled-components/macro";

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit({ username, password });
  };

  return (
    <Paper>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </Form>
    </Paper>
  );
};

const Paper = styled(MuiPaper)`
  && {
    margin: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
  }
`;

const Form = styled.form`
  width: 100%;

  button {
    margin-top: 10px;
  }
`;

export default LoginForm;
