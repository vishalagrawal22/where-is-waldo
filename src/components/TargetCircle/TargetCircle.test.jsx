import React from "react";
import { render, screen } from "@testing-library/react";
import TargetCircle from "./TargetCircle";

describe("TargetCircle", () => {
  it("renders correct size circle", () => {
    render(<TargetCircle radius={20} />);
    const targetCircle = screen.getByTestId("target-circle");
    expect(targetCircle.style.width).toBe("40px");
    expect(targetCircle.style.height).toBe("40px");
  });

  it("renders circle in the correct position", () => {
    render(<TargetCircle radius={20} top={30} left={40} />);
    const targetCircle = screen.getByTestId("target-circle");
    expect(targetCircle.style.left).toBe("20px");
    expect(targetCircle.style.top).toBe("10px");
  });
});
