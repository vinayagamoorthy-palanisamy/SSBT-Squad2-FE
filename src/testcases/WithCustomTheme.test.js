import React from "react";
import { render, screen } from "@testing-library/react";
import withCustomTheme from "./withCustomTheme";
import { useTheme } from "@mui/material/styles";

// Dummy component to consume the theme
const Dummy = () => {
  const theme = useTheme();
  return (
    <div>
      Palette dark main: <span data-testid="main">{theme.palette.dark.main}</span>
      <br />
      Contrast: <span data-testid="contrast">{theme.palette.dark.contrastText}</span>
    </div>
  );
};

const ThemedDummy = withCustomTheme(Dummy);

describe("withCustomTheme HOC", () => {
  it("provides the custom theme to the wrapped component", () => {
    render(<ThemedDummy />);
    expect(screen.getByTestId("main")).toHaveTextContent("#46474B");
    expect(screen.getByTestId("contrast")).toHaveTextContent("#fff");
  });
});
