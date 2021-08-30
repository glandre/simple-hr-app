import MuiContainer from "@material-ui/core/Container";

const Container = ({ children }) => {
  return <MuiContainer fixed>{children}</MuiContainer>;
};

export default Container;
