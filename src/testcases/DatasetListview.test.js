// DatasetListView.test.jsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DatasetListView from "../components/DatasetListView";

const items = [
  { name: "Column_1", type: "column" },
  { name: "Column_2", type: "column" },
  { expression: "SUM(x)", type: "function" },
];

describe("DatasetListView", () => {
  let setItems, toggleSidebar;

  beforeEach(() => {
    setItems = jest.fn();
    toggleSidebar = jest.fn();
  });

  function renderDrawer(open = true) {
    render(
      <DatasetListView
        items={items}
        setItems={setItems}
        isSidebarOpen={open}
        toggleSidebar={toggleSidebar}
      />
    );
  }

  test("renders all items", () => {
    renderDrawer();
    expect(screen.getByText("Column_1")).toBeInTheDocument();
    expect(screen.getByText("Column_2")).toBeInTheDocument();
    expect(screen.getByText("SUM(x)")).toBeInTheDocument();
  });

  test("selects and deselects item on click", () => {
    renderDrawer();
    const item = screen.getByText("Column_1").closest("div");
    expect(item).toHaveStyle({ backgroundColor: "#fafafa" });

    fireEvent.click(item);
    expect(item).toHaveStyle({ backgroundColor: "#e0f3ff" });

    fireEvent.click(item);
    expect(item).toHaveStyle({ backgroundColor: "#fafafa" });
  });

  test("Ctrl/Meta click adds to selection", () => {
    renderDrawer();
    const item1 = screen.getByText("Column_1").closest("div");
    const item2 = screen.getByText("Column_2").closest("div");

    fireEvent.click(item1, { ctrlKey: true });
    fireEvent.click(item2, { ctrlKey: true });

    expect(item1).toHaveStyle({ backgroundColor: "#e0f3ff" });
    expect(item2).toHaveStyle({ backgroundColor: "#e0f3ff" });

    // Should show "2 selected"
    expect(screen.getByText("2 selected")).toBeInTheDocument();
  });

  test("Shift click selects a range", () => {
    renderDrawer();
    const item1 = screen.getByText("Column_1").closest("div");
    const item3 = screen.getByText("SUM(x)").closest("div");

    fireEvent.click(item1);
    fireEvent.click(item3, { shiftKey: true });

    // All should be selected
    expect(screen.getByText("Column_1").closest("div")).toHaveStyle({ backgroundColor: "#e0f3ff" });
    expect(screen.getByText("Column_2").closest("div")).toHaveStyle({ backgroundColor: "#e0f3ff" });
    expect(screen.getByText("SUM(x)").closest("div")).toHaveStyle({ backgroundColor: "#e0f3ff" });
    expect(screen.getByText("3 selected")).toBeInTheDocument();
  });

  test("Delete icon removes item", () => {
    renderDrawer();
    const item = screen.getByText("Column_1").closest("div");
    // Find the delete button (CloseIcon) inside Column_1 item
    const deleteBtn = item.querySelector('button');
    fireEvent.click(deleteBtn);

    expect(screen.queryByText("Column_1")).not.toBeInTheDocument();
  });

  test("Bulk delete button removes selected items", () => {
    renderDrawer();
    // Select two items
    fireEvent.click(screen.getByText("Column_1").closest("div"));
    fireEvent.click(screen.getByText("Column_2").closest("div"), { ctrlKey: true });

    // Delete Selected button
    const bulkDeleteBtn = screen.getByText("Delete Selected");
    fireEvent.click(bulkDeleteBtn);

    expect(screen.queryByText("Column_1")).not.toBeInTheDocument();
    expect(screen.queryByText("Column_2")).not.toBeInTheDocument();
    expect(screen.getByText("SUM(x)")).toBeInTheDocument();
  });

  test("Cancel button calls toggleSidebar", () => {
    renderDrawer();
    fireEvent.click(screen.getByText("Cancel"));
    expect(toggleSidebar).toHaveBeenCalled();
  });

  test("Save button calls setItems and toggleSidebar", () => {
    renderDrawer();
    fireEvent.click(screen.getByText("Save"));
    expect(setItems).toHaveBeenCalled();
    expect(toggleSidebar).toHaveBeenCalled();
  });
});
