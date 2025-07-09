import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomCheckBox from "./CustomCheckBox";

describe("CustomCheckBox", () => {
  it("renders with given width and height", () => {
    const { container } = render(
      <CustomCheckBox
        boxHeight={30}
        boxWidth={30}
        type="checkbox"
        checked={false}
        onChange={() => {}}
      />
    );
    // The outermost span is the box
    const box = container.querySelector("span");
    expect(box).toHaveStyle("width: 30px");
    expect(box).toHaveStyle("height: 30px");
  });

  it("shows blue border when checked and black when not checked", () => {
    const { container, rerender } = render(
      <CustomCheckBox
        boxHeight={20}
        boxWidth={20}
        type="checkbox"
        checked={true}
        onChange={() => {}}
      />
    );
    let box = container.querySelector("span");
    expect(box).toHaveStyle("border: 2px solid blue");

    rerender(
      <CustomCheckBox
        boxHeight={20}
        boxWidth={20}
        type="checkbox"
        checked={false}
        onChange={() => {}}
      />
    );
    box = container.querySelector("span");
    expect(box).toHaveStyle("border: 2px solid black");
  });

  it("renders tick only when checked", () => {
    const { container, rerender } = render(
      <CustomCheckBox
        boxHeight={20}
        boxWidth={20}
        type="checkbox"
        checked={false}
        onChange={() => {}}
      />
    );
    let ticks = container.querySelectorAll("span > span");
    expect(ticks[0]).toHaveStyle("display: none");

    rerender(
      <CustomCheckBox
        boxHeight={20}
        boxWidth={20}
        type="checkbox"
        checked={true}
        onChange={() => {}}
      />
    );
    ticks = container.querySelectorAll("span > span");
    expect(ticks[0]).toHaveStyle("display: block");
  });

  it("calls onChange when clicked", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <CustomCheckBox
        boxHeight={20}
        boxWidth={20}
        type="checkbox"
        checked={false}
        onChange={handleChange}
      />
    );
    const input = container.querySelector("input[type='checkbox']");
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalled();
  });
});
