import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExtractCard from "./ExtractCard";

describe("ExtractCard", () => {
  const props = {
    title: "My Extract",
    description: "A short description",
    selected: false,
    onClick: jest.fn(),
  };

  it("renders title and description", () => {
    render(<ExtractCard {...props} />);
    expect(screen.getByText("My Extract")).toBeInTheDocument();
    expect(screen.getByText("A short description")).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    render(<ExtractCard {...props} />);
    fireEvent.click(screen.getByText("My Extract"));
    expect(props.onClick).toHaveBeenCalled();
  });

  it("applies selected styles when selected is true", () => {
    const { container } = render(<ExtractCard {...props} selected={true} />);
    const card = container.querySelector(".MuiCard-root");
    // Selected background and color
    expect(card).toHaveStyle("background-color: #0014bf");
    expect(card).toHaveStyle("color: #fff");
  });

  it("applies unselected styles when selected is false", () => {
    const { container } = render(<ExtractCard {...props} selected={false} />);
    const card = container.querySelector(".MuiCard-root");
    expect(card).toHaveStyle("background-color: #fff");
    expect(card).toHaveStyle("color: #000");
  });
});
