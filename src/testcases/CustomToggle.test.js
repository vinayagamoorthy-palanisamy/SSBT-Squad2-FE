import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { AntSwitch } from "./AntSwitch";

describe("AntSwitch", () => {
  it("renders without crashing", () => {
    const { getByRole } = render(<AntSwitch />);
    // MUI Switch is rendered as a checkbox
    expect(getByRole("checkbox")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    const { getByRole } = render(<AntSwitch />);
    expect(getByRole("checkbox")).not.toBeChecked();
  });

  it("is checked when checked prop is true", () => {
    const { getByRole } = render(<AntSwitch checked={true} />);
    expect(getByRole("checkbox")).toBeChecked();
  });

  it("calls onChange when clicked", () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<AntSwitch onChange={handleChange} />);
    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it("disables switch when disabled prop is true", () => {
    const { getByRole } = render(<AntSwitch disabled={true} />);
    const checkbox = getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });
});
