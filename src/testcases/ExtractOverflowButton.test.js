import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExtractOverflowButtons from "./ExtractOverflowButtons";

// --- Mocks ---

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// constants
jest.mock("../utils/constant", () => ({
  ExtractStatus: "published",
  ExtractType: "core",
  ExtractFormat: "delimited",
}));

// config
jest.mock("../../config/project", () => ({
  basename: "testbase",
}));

// DynamicButtonGroup
const DynamicButtonGroupMock = jest.fn(() => <div data-testid="dbg" />);
jest.mock("./DynamicButtonGroup", () => (props) => (
  <DynamicButtonGroupMock {...props} />
));

// store
let selectedTableDataMock = [];
jest.mock("../store/useExtractCenterDataStore", () => () => ({
  selectedTableData: selectedTableDataMock,
}));

beforeEach(() => {
  jest.clearAllMocks();
  selectedTableDataMock = [];
  DynamicButtonGroupMock.mockClear();
});

describe("ExtractOverflowButtons", () => {
  it("renders extract buttons group for 'extract' tab", () => {
    render(<ExtractOverflowButtons tab="extract" />);
    expect(screen.getByTestId("dbg")).toBeInTheDocument();
    // Called with 3 extract buttons
    expect(DynamicButtonGroupMock).toHaveBeenCalledWith(
      expect.objectContaining({
        buttons: expect.arrayContaining([
          expect.objectContaining({ type: "createExtract" }),
          expect.objectContaining({ type: "cloneExtract" }),
          expect.objectContaining({ type: "runExtract" }),
        ]),
      }),
      {}
    );
  });

  it("renders workflow buttons group for non-extract tab", () => {
    render(<ExtractOverflowButtons tab="workflow" />);
    expect(screen.getByTestId("dbg")).toBeInTheDocument();
    // Called with workflow button
    expect(DynamicButtonGroupMock).toHaveBeenCalledWith(
      expect.objectContaining({
        buttons: expect.arrayContaining([
          expect.objectContaining({ label: "Create Workflow" }),
        ]),
      }),
      {}
    );
  });

  it("disables 'createExtract' when there is a selected row", () => {
    selectedTableDataMock = [{ id: 1 }];
    render(<ExtractOverflowButtons tab="extract" />);
    const props = DynamicButtonGroupMock.mock.calls[0][0];
    const createBtn = props.buttons.find((b) => b.type === "createExtract");
    expect(createBtn.disabled).toBe(true);
  });

  it("enables 'cloneExtract' only when one row is selected", () => {
    selectedTableDataMock = [{ id: 1 }];
    render(<ExtractOverflowButtons tab="extract" />);
    const props = DynamicButtonGroupMock.mock.calls[0][0];
    const cloneBtn = props.buttons.find((b) => b.type === "cloneExtract");
    expect(cloneBtn.disabled).toBe(false);

    // Multiple selections disables it
    selectedTableDataMock = [{ id: 1 }, { id: 2 }];
    render(<ExtractOverflowButtons tab="extract" />);
    const props2 = DynamicButtonGroupMock.mock.calls[1][0];
    const cloneBtn2 = props2.buttons.find((b) => b.type === "cloneExtract");
    expect(cloneBtn2.disabled).toBe(true);
  });

  it("enables 'runExtract' only when selectedTableData matches status and type", () => {
    selectedTableDataMock = [
      { extractStatus: "published", extractType: "core" },
      { extractStatus: "published", extractType: "core" },
    ];
    render(<ExtractOverflowButtons tab="extract" />);
    const props = DynamicButtonGroupMock.mock.calls[0][0];
    const runBtn = props.buttons.find((b) => b.type === "runExtract");
    expect(runBtn.disabled).toBe(false);

    // If status or type do not match
    selectedTableDataMock = [
      { extractStatus: "draft", extractType: "core" },
      { extractStatus: "published", extractType: "core" },
    ];
    render(<ExtractOverflowButtons tab="extract" />);
    const props2 = DynamicButtonGroupMock.mock.calls[1][0];
    const runBtn2 = props2.buttons.find((b) => b.type === "runExtract");
    expect(runBtn2.disabled).toBe(true);
  });

  it("navigates to create-extract on createExtract click", () => {
    render(<ExtractOverflowButtons tab="extract" />);
    const props = DynamicButtonGroupMock.mock.calls[0][0];
    // Simulate the button click
    props.buttons.find((b) => b.type === "createExtract").onClick();
    expect(mockNavigate).toHaveBeenCalledWith("/testbase/create-extract");
  });
});
