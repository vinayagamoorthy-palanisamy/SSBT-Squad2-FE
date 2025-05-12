// withCustomTheme.js
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const WithCustomTheme = (WrappedComponent) => {
  const theme = createTheme({
    palette: {
      dark: {
        main: "#46474B",
        contrastText: '#fff'
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
