import { createTheme } from "@material-ui/core";

// For a reference how to override theme and the CssBaseline, go to:
// https://material-ui.com/customization/globals/#global-css

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          width: "100%",
          height: "100%",
        },
        body: {
          width: "100%",
          height: "100%",
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
      },
    },
  },
});

export default theme;
