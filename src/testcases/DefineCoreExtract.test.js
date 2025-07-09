import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DefineCoreExtract from "./DefineCoreExtract";

describe("DefineCoreExtract", () => {
  it("renders all main sections", () => {
    render(<DefineCoreExtract />);
    expect(screen.getByText(/define core extract/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/extract format/i)).toBeInTheDocument();
    expect(screen.getByText(/extract parameters/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("renders tab labels and switches tabs", () => {
    render(<DefineCoreExtract />);
    expect(screen.getByText("Header SQL")).toBeInTheDocument();
    expect(screen.getByText("Footer SQL")).toBeInTheDocument();
    expect(screen.getByText("Session SQL")).toBeInTheDocument();
    expect(screen.getByText("Warehouse SQL")).toBeInTheDocument();

    // Tab switch
    fireEvent.click(screen.getByText("Footer SQL"));
    expect(screen.getByPlaceholderText(/enter footer sql/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Warehouse SQL"));
    expect(screen.getByPlaceholderText(/enter warehouse sql/i)).toBeInTheDocument();
  });

  it("changes Name and Format fields", () => {
    render(<DefineCoreExtract />);
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: "MyExtract" } });
    expect(nameInput.value).toBe("MyExtract");

    const formatSelect = screen.getByLabelText(/extract format/i);
    fireEvent.mouseDown(formatSelect);
    fireEvent.click(screen.getByText("Fixed"));
    expect(formatSelect.value).toBe("Fixed");
  });

  it("edits a parameter", () => {
    render(<DefineCoreExtract />);
    // Edit the first parameter's name and value
    const nameInputs = screen.getAllByDisplayValue(/P_IN_CLIENT_ID|P_IN_EFFECTIVE_DATE/);
    fireEvent.change(nameInputs[0], { target: { value: "NEW_PARAM_NAME" } });
    expect(nameInputs[0].value).toBe("NEW_PARAM_NAME");
  });

  it("adds a parameter", () => {
    render(<DefineCoreExtract />);
    const nameInput = screen.getAllByPlaceholderText(/name/i)[1];
    const valueInput = screen.getAllByPlaceholderText(/value/i)[1];
    fireEvent.change(nameInput, { target: { value: "FOO_PARAM" } });
    fireEvent.change(valueInput, { target: { value: "FOO_VALUE" } });

    const addBtn = screen.getAllByRole("button", { name: "" }).find(
      btn => btn.firstChild && btn.firstChild.tagName === "svg"
    );
    fireEvent.click(addBtn);

    // New parameter row should now be present
    expect(screen.getByDisplayValue("FOO_PARAM")).toBeInTheDocument();
    expect(screen.getByDisplayValue("FOO_VALUE")).toBeInTheDocument();
  });

  it("deletes a parameter", () => {
    render(<DefineCoreExtract />);
    const delBtns = screen.getAllByRole("button", { name: "" }).filter(
      btn => btn.querySelector("svg[data-testid='DeleteIcon']")
    );
    const firstParamName = screen.getAllByDisplayValue(/P_IN_CLIENT_ID|P_IN_EFFECTIVE_DATE/)[0].value;
    fireEvent.click(delBtns[0]);
    // The first parameter's name input should no longer be present
    expect(screen.queryByDisplayValue(firstParamName)).not.toBeInTheDocument();
  });

  it("filters parameters with search", () => {
    render(<DefineCoreExtract />);
    // Existing param value: "${env.date}"
    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: "date" } });
    expect(screen.getByDisplayValue("${env.date}")).toBeInTheDocument();
    // Should hide others
    expect(screen.queryByDisplayValue("JANUS")).not.toBeInTheDocument();
  });
});
