import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MyAutocomplete from "./MyAutocomplete";

describe("MyAutocomplete", () => {
  const options = ["Alpha", "Beta", "Gamma"];

  it("renders label and input", () => {
    render(
      <MyAutocomplete
        label="Select Item"
        options={options}
        value={null}
        onChange={() => {}}
      />
    );
    expect(screen.getByText(/select item:/i)).toBeInTheDocument();
    // Input is rendered
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows options and selects value", () => {
    const handleChange = jest.fn();
    render(
      <MyAutocomplete
        label="Select Option"
        options={options}
        value={null}
        onChange={handleChange}
      />
    );
    // Open dropdown
    fireEvent.mouseDown(screen.getByRole("combobox"));
    // Options are in the listbox
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
    // Select an option
    fireEvent.click(screen.getByText("Beta"));
    expect(handleChange).toHaveBeenCalledWith("Beta");
  });

  it("renders with a value", () => {
    render(
      <MyAutocomplete
        label="Choose"
        options={options}
        value="Gamma"
        onChange={() => {}}
      />
    );
    expect(screen.getByDisplayValue("Gamma")).toBeInTheDocument();
  });
});
