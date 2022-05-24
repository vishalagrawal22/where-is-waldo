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
    const insideCircle = {
      x: 6,
      y: 6,
      radius: 3,
    };
    const farAwayCircle = {
      x: 10,
      y: 20,
      radius: 6,
    };
    const intersectingCircle = {
      x: 10,
      y: 10,
      radius: 6,
    };
    return { commonCircle, insideCircle, farAwayCircle, intersectingCircle };
  }

  it("returns true when one circle lies within another circle", () => {
    const { commonCircle, insideCircle } = setup();

    expect(liesInside(commonCircle, insideCircle)).toBe(true);
  });

  it("returns false when circles intersect", () => {
    const { commonCircle, intersectingCircle } = setup();

    expect(liesInside(commonCircle, intersectingCircle)).toBe(false);
  });

  it("returns false when circles are far away", () => {
    const { commonCircle, farAwayCircle } = setup();

    expect(liesInside(commonCircle, farAwayCircle)).toBe(false);
  });

  describe("when order of input is reversed", () => {
    it("returns true when one circle lies within another circle", () => {
      const { commonCircle, insideCircle } = setup();

      expect(liesInside(insideCircle, commonCircle)).toBe(true);
    });

    it("returns false when circles intersect", () => {
      const { commonCircle, intersectingCircle } = setup();

      expect(liesInside(intersectingCircle, commonCircle)).toBe(false);
    });

    it("returns false when circles are far away", () => {
      const { commonCircle, farAwayCircle } = setup();

      expect(liesInside(farAwayCircle, commonCircle)).toBe(false);
    });
  });
});
