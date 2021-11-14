// TODO: refactor this

import { FibonacciGenerator } from "features";
import { Coords } from "shared/types";

// TODO: solve linter issues
// TODO: rewrite this function
// NOTE: recursion function
// eslint-disable-next-line max-statements
export const getSpiralPath = (
  fibonacci: FibonacciGenerator,
  scale: number,
  maxRadius: number,
  angleOffset: number,
  firstPoint: Coords,
  radius: number,
  angle: number,
  iter: number,
  path: Coords[]
  // eslint-disable-next-line max-params
): Coords[] => {
  const scaledRadius = scale * radius;
  if (scaledRadius > maxRadius) {
    return path;
  }

  const precision = 40; // Lines to draw in each 1/4 turn
  const nextAngle = angle + angleOffset;

  const newX = scaledRadius * Math.cos(nextAngle) + firstPoint.x;
  const newY = scaledRadius * Math.sin(nextAngle) + firstPoint.y;
  const newPoint = {
    x: newX,
    y: newY,
  };
  const newPath = [...path, newPoint];
  const newIter = iter + 1; // Next point
  const step = newIter / precision; // 1/4 turns at point
  const newRadius = fibonacci.getNumber(step); // Radius of Fibonacci spiral
  const newAngle = (step * Math.PI) / 2; // Radians at point

  return getSpiralPath(
    fibonacci,
    scale,
    maxRadius,
    angleOffset,
    firstPoint,
    newRadius,
    newAngle,
    newIter,
    newPath
  );
};
