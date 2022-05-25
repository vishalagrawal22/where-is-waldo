export function square(number) {
  return number * number;
}

export function getDistance(point1, point2) {
  return Math.sqrt(square(point1.x - point2.x) + square(point1.y - point2.y));
}

export function liesInside(circle, point) {
  if (!circle.hasOwnProperty("radius")) {
    return null;
  }

  const dist = getDistance(
    {
      x: circle.x,
      y: circle.y,
    },
    {
      x: point.x,
      y: point.y,
    }
  );

  return dist <= circle.radius;
}
