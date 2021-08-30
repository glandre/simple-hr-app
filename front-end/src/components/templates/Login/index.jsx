import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import LoginForm from "../../organisms/LoginForm";

const LoginTemplate = ({ onSubmit }) => {
  return (
    <LoginContainer>
      <LoginForm onSubmit={onSubmit} />
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  padding-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

LoginTemplate.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginTemplate;
