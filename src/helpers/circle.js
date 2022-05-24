export function square(number) {
  return number * number;
}

export function getDistance(point1, point2) {
  return Math.sqrt(square(point1.x - point2.x) + square(point1.y - point2.y));
}

export function liesInside(circle1, circle2) {
  const dist = getDistance(
    {
      x: circle1.x,
      y: circle1.y,
    },
    {
      x: circle2.x,
      y: circle2.y,
    }
  );

  const smallerRadius = Math.min(circle1.radius, circle2.radius);
  const largerRadius = Math.max(circle1.radius, circle2.radius);
  return smallerRadius + dist <= largerRadius;
}
