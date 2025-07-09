import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ParameterPreviewModal from "./ParameterPreviewModal";

describe("ParameterPreviewModal", () => {
  const parameters = [
    { name: "Param1", value: "Value1" },
    { name: "Param2", value: "Value2" },
  ];
  const onClose = jest.fn();
  const onViewData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal with parameters table when open", () => {
    render(
      <ParameterPreviewModal
        open={true}
        onClose={onClose}
        parameters={parameters}
        onViewData={onViewData}
      />
    );
    expect(screen.getByText(/extract parameters/i)).toBeInTheDocument();
    expect(screen.getByText("Param1")).toBeInTheDocument();
    expect(screen.getByText("Value1")).toBeInTheDocument();
    expect(screen.getByText("Param2")).toBeInTheDocument();
    expect(screen.getByText("Value2")).toBeInTheDocument();
  });

  it("does not render modal when open is false", () => {
    render(
      <ParameterPreviewModal
        open={false}
        onClose={onClose}
        parameters={parameters}
        onViewData={onViewData}
      />
    );
    expect(screen.queryByText(/extract parameters/i)).not.toBeInTheDocument();
  });

  it("calls onClose when close icon is clicked", () => {
    render(
      <ParameterPreviewModal
        open={true}
        onClose={onClose}
        parameters={parameters}
        onViewData={onViewData}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(
      <ParameterPreviewModal
        open={true}
        onClose={onClose}
        parameters={parameters}
        onViewData={onViewData}
      />
    );
    fireEvent.click(screen.getByText(/cancel/i));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose and onViewData when View Preview is clicked", () => {
    render(
      <ParameterPreviewModal
        open={true}
        onClose={onClose}
        parameters={parameters}
        onViewData={onViewData}
      />
    );
    fireEvent.click(screen.getByText(/view preview/i));
    expect(onClose).toHaveBeenCalled();
    expect(onViewData).toHaveBeenCalled();
  });
});
