import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropDown from "../components/DropDown";

describe("DropDown component", () => {
  const options = [
    { label: "One", value: "one" },
    { label: "Two", value: "two", disable: true },
    { label: "Three", value: "three" },
  ];
  const handleChange = jest.fn();

  test("renders label and options", () => {
    render(
      <DropDown
        value=""
        handleChange={handleChange}
        label="Test Label"
        options={options}
      />
    );

    // Label renders
    expect(screen.getByText("Test Label")).toBeInTheDocument();

    // Placeholder is present
    expect(screen.getByText("Select")).toBeInTheDocument();

    // Options render after opening select
    fireEvent.mouseDown(screen.getByText("Select")); // open the select

    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
    expect(screen.getByText("Three")).toBeInTheDocument();
  });

  test("calls handleChange when an option is selected", () => {
    render(
      <DropDown
        value=""
        handleChange={handleChange}
        label="Select Option"
        options={options}
      />
    );

    fireEvent.mouseDown(screen.getByText("Select")); // open
    fireEvent.click(screen.getByText("One"));

    expect(handleChange).toHaveBeenCalled();
  });

  test("disables option when disable prop is true", () => {
    render(
      <DropDown
        value=""
        handleChange={handleChange}
        label="Select Option"
        options={options}
      />
    );

    fireEvent.mouseDown(screen.getByText("Select"));
    const disabledOption = screen.getByText("Two").closest("li");
    expect(disabledOption).toHaveAttribute("aria-disabled", "true");
  });

  test("shows the selected value", () => {
    render(
      <DropDown
        value="three"
        handleChange={handleChange}
        label="Select Option"
        options={options}
      />
    );
    // The selected option should be shown in the select
    expect(screen.getByText("Three")).toBeInTheDocument();
  });
});
