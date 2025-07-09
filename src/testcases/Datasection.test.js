import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock subcomponents
jest.mock("./DropDown", () => () => <div data-testid="dropdown" />);
jest.mock("./SQLEditor", () => () => <div data-testid="sql-editor" />);
jest.mock("../CustomToggle", () => ({
  AntSwitch: (props) => (
    <input
      data-testid="ant-switch"
      type="checkbox"
      checked={props.checked}
      onChange={props.onChange}
      aria-label={props["aria-label"]}
    />
  ),
}));

// Mock store hooks
const mockHandleOpenModal = jest.fn();
const mockHandleDataset = jest.fn();

jest.mock("../store/useCustomModal", () => () => ({
  handleOpenModal: mockHandleOpenModal,
}));
jest.mock("../store/useCreateExtract", () => () => ({
  datasetList: ["Dataset1"],
  sqlEditorToggle: [true],
  handleDataset: mockHandleDataset,
}));

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe("DatasetSection", () => {
  it("renders Define Dataset title", () => {
    render(<DatasetSection />);
    expect(screen.getByText(/define dataset/i)).toBeInTheDocument();
  });

  it("renders datasets from the store", () => {
    render(<DatasetSection />);
    expect(screen.getByText("Dataset1")).toBeInTheDocument();
  });

  it("renders Add Dataset button", () => {
    render(<DatasetSection />);
    expect(screen.getByText(/add dataset/i)).toBeInTheDocument();
  });

  it("calls handleOpenModal when Add Dataset button is clicked", () => {
    render(<DatasetSection />);
    fireEvent.click(screen.getByText(/add dataset/i));
    expect(mockHandleOpenModal).toHaveBeenCalled();
  });

  it("renders DropDown and SQL Editor for dataset", () => {
    render(<DatasetSection />);
    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("sql-editor")).toBeInTheDocument();
  });

  it("calls handleDataset when AntSwitch is toggled", () => {
    render(<DatasetSection />);
    fireEvent.click(screen.getByTestId("ant-switch"));
    expect(mockHandleDataset).toHaveBeenCalled();
  });

  it("shows menu and handles delete action", () => {
    render(<DatasetSection />);
    // Open menu (3-dot icon)
    fireEvent.click(screen.getByLabelText(/more/i));
    // Click "Delete Dataset"
    fireEvent.click(screen.getByText(/delete dataset/i));
    // handleDataset should be called with filtered dataset
    expect(mockHandleDataset).toHaveBeenCalled();
  });

  it("shows menu and handles rename/edit action", () => {
    render(<DatasetSection />);
    fireEvent.click(screen.getByLabelText(/more/i));
    fireEvent.click(screen.getByText(/rename dataset/i));
    expect(mockHandleOpenModal).toHaveBeenCalled();
  });
});
