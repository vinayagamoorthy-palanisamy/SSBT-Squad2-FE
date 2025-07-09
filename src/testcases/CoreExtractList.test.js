import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ExtractList from "./ExtractList";
import { fetchCoreExtractListingData } from "../service";

// Mock API
jest.mock("../service", () => ({
  fetchCoreExtractListingData: jest.fn(),
}));

// Mock store hooks
const setSelectedExtract = jest.fn();
jest.mock("../store/useCreateExtract", () => () => ({
  setSelectedExtract,
}));
const setExtractFormData = jest.fn();
jest.mock("../store/useExtractFormStore", () => () => ({
  setExtractFormData,
}));


describe("ExtractList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockData = [
    { id: "1", name: "Core A", description: "Desc A", sessionAttributes: [] },
    { id: "2", name: "Core B", description: "Desc B", sessionAttributes: [] },
  ];

  it("renders loading state", async () => {
    fetchCoreExtractListingData.mockReturnValueOnce(new Promise(() => {})); // Never resolves
    render(<ExtractList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    fetchCoreExtractListingData.mockRejectedValueOnce(new Error("fail"));
    render(<ExtractList />);
    await screen.findByText(/failed to load core extract list/i);
  });

  it("renders list and filters by search", async () => {
    fetchCoreExtractListingData.mockResolvedValueOnce({ data: { data: mockData } });
    render(<ExtractList />);
    expect(await screen.findByText("Core A")).toBeInTheDocument();
    expect(screen.getByText("Core B")).toBeInTheDocument();

    // Type in search
    fireEvent.change(screen.getByPlaceholderText(/search extracts/i), {
      target: { value: "A" },
    });
    expect(screen.getByText("Core A")).toBeInTheDocument();
    expect(screen.queryByText("Core B")).not.toBeInTheDocument();
  });

  it("sorts items on button click", async () => {
    fetchCoreExtractListingData.mockResolvedValueOnce({ data: { data: mockData } });
    render(<ExtractList />);
    await screen.findByText("Core A");

    // Should default to "A → Z"
    expect(screen.getByText(/sort a → z/i)).toBeInTheDocument();
    // Click to toggle sort
    fireEvent.click(screen.getByText(/sort a → z/i));
    expect(screen.getByText(/sort z → a/i)).toBeInTheDocument();
  });

  it("selects a core extract on Paper or Radio click", async () => {
    const sessionAttributes = [
      { name: "param1", value: "val1" },
      { name: "param2", value: "val2" },
    ];
    fetchCoreExtractListingData.mockResolvedValueOnce({
      data: { data: [{ id: "5", name: "Sample", description: "", sessionAttributes }] },
    });
    render(<ExtractList />);
    expect(await screen.findByText("Sample")).toBeInTheDocument();

    // Click on the Paper
    fireEvent.click(screen.getByText("Sample"));
    expect(setSelectedExtract).toHaveBeenCalledWith(
      expect.objectContaining({ id: "5" })
    );
    expect(setExtractFormData).toHaveBeenCalledWith(
      expect.objectContaining({ id: "5" })
    );

    // Click Radio (triggers sessionAttributes logic)
    fireEvent.click(screen.getByRole("radio"));
    expect(setExtractFormData).toHaveBeenCalledWith({
      extractParameters: [
        { name: "param1", value: "val1" },
        { name: "param2", value: "val2" },
      ],
    });
  });
});
