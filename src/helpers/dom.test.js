import { getBoundingClientRect } from "./dom.js";

describe("getBoundingClientRect", () => {
  it("should call event.currentTarget.getBoundingClientRect", () => {
    const mockEvent = {
      currentTarget: {
        getBoundingClientRect: jest.fn(),
      },
    };
    getBoundingClientRect(mockEvent);
    expect(mockEvent.currentTarget.getBoundingClientRect).toBeCalled();
  });

  it("should return the value of event.currentTarget.getBoundingClientRect", () => {
    const rect = {
      bottom: 608,
      height: 600,
      left: 8,
      right: 808,
      top: 8,
      width: 800,
      x: 8,
      y: 8,
    };
    const mockEvent = {
      currentTarget: {
        getBoundingClientRect: jest.fn(() => rect),
      },
    };
    expect(getBoundingClientRect(mockEvent)).toBe(rect);
  });
});
