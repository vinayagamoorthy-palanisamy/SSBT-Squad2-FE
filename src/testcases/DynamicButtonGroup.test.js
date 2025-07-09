import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DynamicButtonGroup from "./DynamicButtonGroup";

// Mock ThemeProvider if needed (ssc-photon-core theme may be a custom object)
jest.mock("ssc-photon-core", () => ({
  theme: {},
}));

describe("DynamicButtonGroup", () => {
  const buttons = [
    {
      seq: 1,
      label: "Create",
      type: "createExtract",
      disabled: true,
      onClick: jest.fn(),
    },
    {
      seq: 2,
      label: "Clone",
      type: "cloneExtract",
      disabled: true,
      onClick: jest.fn(),
    },
    {
      seq: 3,
      label: "Run",
      type: "runExtract",
      disabled: false,
      onClick: jest.fn(),
    },
  ];

  it("renders the correct number of buttons", () => {
    render(<DynamicButtonGroup buttons={buttons} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByText("Clone")).toBeInTheDocument();
    expect(screen.getByText("Run")).toBeInTheDocument();
  });

  it("applies disabled prop to buttons", () => {
    render(<DynamicButtonGroup buttons={buttons} />);
    expect(screen.getByText("Create")).toBeDisabled();
    expect(screen.getByText("Clone")).toBeDisabled();
    expect(screen.getByText("Run")).not.toBeDisabled();
  });

  it("calls onClick for enabled button", () => {
    render(<DynamicButtonGroup buttons={buttons} />);
    fireEvent.click(screen.getByText("Run"));
    expect(buttons[2].onClick).toHaveBeenCalled();
  });

  it("does not call onClick for disabled button", () => {
    render(<DynamicButtonGroup buttons={buttons} />);
    fireEvent.click(screen.getByText("Create"));
    expect(buttons[0].onClick).not.toHaveBeenCalled();
  });

  it("shows the correct tooltip for each button", async () => {
    render(<DynamicButtonGroup buttons={buttons} />);
    // Tooltips are not visible until hover, so check the title attribute on the wrapper span
    expect(screen.getByText("Create").closest("span").getAttribute("title") || "")
      .toBe("");
    // Simulate hover (RTL won't show tooltip text by default, but MUI puts the title prop for fallback)
    expect(screen.getByText("Create").closest("span").parentElement).toHaveAttribute(
      "title",
      " Start a new Create Extract Process"
    );
    expect(screen.getByText("Clone").closest("span").parentElement).toHaveAttribute(
      "title",
      "Only one extract can be clone at the  time "
    );
    expect(screen.getByText("Run").closest("span").parentElement).toHaveAttribute(
      "title",
      ""
    );
  });
});
