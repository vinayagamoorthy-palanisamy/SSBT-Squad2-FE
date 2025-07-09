import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Rule from "./Rule";

// Mock options used in the component
jest.mock("./Constants", () => ({
  columnOptions: [
    { label: "Col1", value: "col1" },
    { label: "Col2", value: "col2" },
  ],
  operatorOptions: [
    { label: "Equals", value: "eq" },
    { label: "Greater", value: "gt" },
  ],
}));

describe("Rule", () => {
  const baseData = { column: "col1", operator: "eq", value: "123" };
  const onChange = jest.fn();
  const onRemove = jest.fn();
  const onDragStart = jest.fn();
  const onDragOver = jest.fn();
  const onDrop = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders select options and value input", () => {
    render(
      <Rule
        data={baseData}
        onChange={onChange}
        onRemove={onRemove}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    );
    // Should render current column, operator, and value
    expect(screen.getByDisplayValue("col1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("eq")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123")).toBeInTheDocument();
  });

  it("calls onChange when column is changed", () => {
    render(
      <Rule
        data={baseData}
        onChange={onChange}
        onRemove={onRemove}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    );
    fireEvent.mouseDown(screen.getAllByRole("button")[0]); // column select
    fireEvent.click(screen.getByText("Col2"));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ column: "col2" }));
  });

  it("calls onChange when operator is changed", () => {
    render(
      <Rule
        data={baseData}
        onChange={onChange}
        onRemove={onRemove}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    );
    fireEvent.mouseDown(screen.getAllByRole("button")[1]); // operator select
    fireEvent.click(screen.getByText("Greater"));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ operator: "gt" }));
  });

  it("calls onChange when value is changed", () => {
    render(
      <Rule
        data={baseData}
        onChange={onChange}
        onRemove={onRemove}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    );
    fireEvent.change(screen.getByPlaceholderText(/enter value/i), {
      target: { value: "456" },
    });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: "456" }));
  });

  it("calls onRemove when remove button is clicked", () => {
    render(
      <Rule
        data={baseData}
        onChange={onChange}
        onRemove={onRemove}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    );
    fireEvent.click(screen.getAllByRole("button")[2]); // CloseIcon button
    expect(onRemove).toHaveBeenCalled();
  });

  it("calls drag events handlers", () => {
    render(
      <Rule
        data={baseData}
        onChange={onChange}
        onRemove={onRemove}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    );
    const stack = screen.getByRole("group"); // Stack is rendered as div, not group, so fallback:
    const stackDiv = screen.getByText("Col1").closest("div[draggable=true]");
    fireEvent.dragStart(stackDiv);
    expect(onDragStart).toHaveBeenCalled();

    fireEvent.dragOver(stackDiv);
    expect(onDragOver).toHaveBeenCalled();

    fireEvent.drop(stackDiv);
    expect(onDrop).toHaveBeenCalled();
  });
});
