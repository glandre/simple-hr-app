import styled from "styled-components/macro";

const SizedBox = styled.div`
  overflow: auto;
  height: calc(87vh);
  @media (min-width: 768px) {
    min-width: ${(props) => props.minWidth || "500px"};
  }

  @media (min-height: 850px) {
    height: 93vh;
  }
`;

export default SizedBox;
