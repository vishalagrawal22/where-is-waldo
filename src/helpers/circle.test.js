import { square, getDistance, liesInside } from "./circle";

describe("square", () => {
  it("caclulates square properly (integer)", () => {
    expect(square(7)).toBe(49);
  });

  it("caclulates square properly (decimal)", () => {
    expect(square(2.5)).toBeCloseTo(6.25);
  });
});

describe("getDistance", () => {
  it("calculates the distance correctly (integer)", () => {
    const point1 = {
      x: 0,
      y: 0,
    };

    const point2 = {
      x: 3,
      y: 4,
    };

    expect(getDistance(point1, point2)).toBeCloseTo(5);
  });

  it("calculates the distance correctly (decimal)", () => {
    const point1 = {
      x: 5,
      y: 5,
    };

    const point2 = {
      x: 8,
      y: 4,
    };

    expect(getDistance(point1, point2)).toBeCloseTo(3.1622);
  });
});

describe("liesInside", () => {
  function setup() {
    const commonCircle = {
      x: 5,
      y: 5,
      radius: 5,
    };
    const insidePoint = {
      x: 6,
      y: 6,
    };
    const outsidePoint = {
      x: 10,
      y: 20,
    };
    const onCirclePoint = {
      x: 8,
      y: 9,
    };
    return { commonCircle, insidePoint, outsidePoint, onCirclePoint };
  }

  it("returns true when point lies insdie the circle", () => {
    const { commonCircle, insidePoint } = setup();

    expect(liesInside(commonCircle, insidePoint)).toBe(true);
  });

  it("returns true when point lies on the circle", () => {
    const { commonCircle, onCirclePoint } = setup();

    expect(liesInside(commonCircle, onCirclePoint)).toBe(true);
  });

  it("returns false when point lies outside the circle", () => {
    const { commonCircle, outsidePoint } = setup();

    expect(liesInside(commonCircle, outsidePoint)).toBe(false);
  });

  describe("when order of input is reversed", () => {
    it("returns null", () => {
      const { commonCircle, insidePoint } = setup();

      expect(liesInside(insidePoint, commonCircle)).toBeNull();
    });
  });
});
