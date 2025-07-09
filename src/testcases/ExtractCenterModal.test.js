import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExtractCenterModal from "./ExtractCenterModal";

describe("ExtractCenterModal", () => {
  it("renders content when isOpen is true", () => {
    render(
      <ExtractCenterModal
        isOpen={true}
        handleCloseModal={jest.fn()}
        content={<div data-testid="modal-content">Modal Content</div>}
      />
    );
    expect(screen.getByTestId("modal-content")).toBeInTheDocument();
  });

  it("does not render content when isOpen is false", () => {
    render(
      <ExtractCenterModal
        isOpen={false}
        handleCloseModal={jest.fn()}
        content={<div data-testid="modal-content">Modal Content</div>}
      />
    );
    // Dialog and its children should not be present in the DOM
    expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
  });

  it("calls handleCloseModal when dialog requests close", () => {
    const handleClose = jest.fn();
    render(
      <ExtractCenterModal
        isOpen={true}
        handleCloseModal={handleClose}
        content={<div>Content</div>}
      />
    );
    // Fire backdrop click or escape key
    // easiest is to find the dialog and fire a close event
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    // Wait for onClose to be called (mui handles this asynchronously)
    // In reality, you might need to use waitFor if your Dialog is async, but for this simple case:
    expect(handleClose).toHaveBeenCalled();
  });
});
