import styled from "styled-components";

const Container = ({ children }) => {
  return <FlexContainer>{children}</FlexContainer>;
};

const FlexContainer = styled.div`
  display: flex;
  margin: 90px 30px;
`;

export default Container;
