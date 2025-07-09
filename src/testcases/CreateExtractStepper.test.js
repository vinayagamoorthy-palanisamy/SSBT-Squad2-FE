import React from "react";
import { render, screen } from "@testing-library/react";
import CreateExtractStepper from "./CreateExtractStepper";

describe("CreateExtractStepper", () => {
  const steps = ["First Step", "Second Step", "Final Step"];

  it("renders all steps", () => {
    render(<CreateExtractStepper steps={steps} activeStep={0} />);
    steps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it("highlights the active step", () => {
    render(<CreateExtractStepper steps={steps} activeStep={1} />);
    // The active step should have aria-current="step"
    // StepLabel's text is in a span inside MuiStepLabel-root
    const activeStepLabel = screen.getByText("Second Step");
    const activeStepRoot = activeStepLabel.closest(".MuiStepLabel-root");
    expect(activeStepRoot).toHaveAttribute("aria-current", "step");
  });

  it("renders correct width based on step count", () => {
    const { container: threeStep } = render(<CreateExtractStepper steps={steps} activeStep={0} />);
    const stepper = threeStep.querySelector(".MuiStepper-root");
    // Should be 50% width for 3 steps
    expect(stepper).toHaveStyle("width: 50%");

    // Should be 25% width for 2 steps
    const { container: twoStep } = render(<CreateExtractStepper steps={["A", "B"]} activeStep={0} />);
    const twoStepStepper = twoStep.querySelector(".MuiStepper-root");
    expect(twoStepStepper).toHaveStyle("width: 25%");
  });

  it("renders no steps if steps array is empty", () => {
    render(<CreateExtractStepper steps={[]} activeStep={0} />);
    // No list items should be rendered
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("does not throw if activeStep is out of range", () => {
    render(<CreateExtractStepper steps={steps} activeStep={10} />);
    steps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });
});
