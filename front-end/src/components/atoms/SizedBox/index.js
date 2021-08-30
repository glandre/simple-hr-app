import styled from "styled-components/macro";

const SizedBox = styled.div`
  overflow: auto;
  height: calc(90vh);
  @media (min-width: 768px) {
    min-width: ${(props) => props.minWidth || "500px"};
  }

  @media (min-height: 850px) {
    height: 95vh;
  }
`;

export default SizedBox;
