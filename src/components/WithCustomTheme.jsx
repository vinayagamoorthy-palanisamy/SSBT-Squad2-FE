// withCustomTheme.js
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const WithCustomTheme = (WrappedComponent) => {
  const theme = createTheme({
    palette: {
      dark: {
        main: "#46474B",
        contrastText: '#000'
      },
      defaultPrimary: {
        main: "#0014BF",
        contrastText: '#000'
      },
    },
  });

  return function ThemedComponent(props) {
    return (
      <ThemeProvider theme={theme}>
        <WrappedComponent {...props} />
      </ThemeProvider>
    );
  };
};

export default WithCustomTheme;
