import { render, screen } from "@testing-library/react";
import React from "react";

import ToastBox from "./ToastBox";

function setup() {
  const duration = 2000;
  const text = "a toast message";
  const clearText = jest.fn();
  return { duration, text, clearText };
}

jest.useFakeTimers();
describe("ToastBox", () => {
  it("return null when provided text is null", () => {
    render(<ToastBox text={null} />);

    const toastBox = screen.queryByTestId("toast-box");
    expect(toastBox).not.toBeInTheDocument();
  });

  it("renders provided text", () => {
    const { text } = setup();
    render(<ToastBox text={text} />);

    const toastBox = screen.getByText(text);
    expect(toastBox).toBeInTheDocument();
  });

  it("calls the clearText when duration is over", () => {
    const { text, duration, clearText } = setup();
    render(<ToastBox text={text} duration={duration} clearText={clearText} />);

    jest.advanceTimersByTime(duration);

    expect(clearText).toBeCalled();
  });

  it("adds info class when textType is null", () => {
    const { text } = setup();
    render(<ToastBox text={text} />);

    const toastBox = screen.getByText(text);
    expect(toastBox).toHaveClass("info");
  });

  it("adds success class when textType is success", () => {
    const { text } = setup();
    render(<ToastBox text={text} textType={"success"} />);

    const toastBox = screen.getByText(text);
    expect(toastBox).toHaveClass("success");
  });

  it("adds failure class when textType is failure", () => {
    const { text } = setup();
    render(<ToastBox text={text} textType={"failure"} />);

    const toastBox = screen.getByText(text);
    expect(toastBox).toHaveClass("failure");
  });
});
