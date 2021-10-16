import { FibonacciGenerator } from "features/Progress/FibonacciGenerator";
import { CENTER_POINT, HALF_SIZE } from "features/Progress/progress.constants";
import { fibonacciNums } from "./constants";
import { Coords } from "./types";

// TODO: refactor this methods
export const getAngle = (firstPoint: Coords, secondPoint: Coords) => {
  const deltaX = secondPoint.x - firstPoint.x;
  const deltaY = secondPoint.y - firstPoint.y;
  const radians = Math.atan2(deltaY, deltaX);

  return radians;
};

export const getDistance = (firstPoint: Coords, secondPoint: Coords) => {
  const deltaX = firstPoint.x - secondPoint.x;
  const deltaY = firstPoint.y - secondPoint.y;

  // NOTE: pythagoras theorem for distances
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  return distance;
};

export const getSpiral = (
  firstPoint: Coords,
  secondPoint: Coords,
  maxRadius: number
): Coords[] => {
  // 1 step = 1/4 turn or 90º
  const stepsToSecondPoint = 4; // Steps to get to second point

  const angleToSecondPoint = getAngle(firstPoint, secondPoint);
  // Find angle offset so that last point of the curve is at angle to secondPoint
  const angleOffset = angleToSecondPoint - (stepsToSecondPoint * Math.PI) / 2;
  const distanceToSecondPoint = getDistance(firstPoint, secondPoint);
  const scale = getScale(distanceToSecondPoint, stepsToSecondPoint);

  return getPath(scale, maxRadius, angleOffset, firstPoint, 0, 0, 0, []);
};

const fibonacci = new FibonacciGenerator();

const getScale = (distance: number, stepsToNext: number) => {
  // Find scale so that the last point of the curve is at distance to secondPoint
  const radiusToSecondPoint = fibonacci.getNumber(stepsToNext);

  return distance / radiusToSecondPoint;
};

// TODO: refactor this
const getPath = (
  scale: number,
  maxRadius: number,
  angleOffset: number,
  firstPoint: Coords,
  radius: number,
  angle: number,
  iter: number,
  path: Coords[]
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

  return getPath(
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

export const getColor = (num: number) => {
  const isFibNum = fibonacciNums.includes(num);

  if (!isFibNum) return "#fff";

  const hex = num.toString(16);
  const hexArr = hex.split("");
  const newArr = Array(6 - hexArr.length).fill("F");

  return `#${hexArr.concat(newArr).join("")}`;
};

export const drawStroke = (
  context: CanvasRenderingContext2D,
  points: Coords[],
  offset: Coords = { x: 0, y: 0 },
  color: string
) => {
  if (!context) return;

  context.beginPath();

  context.lineWidth = 28;
  context.lineCap = "round";
  context.strokeStyle = color;

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const newPointX = offset.x + point.x;
    const newPointY = offset.y + point.y;

    if (i === 0) {
      context.moveTo(newPointX, newPointY);
    } else {
      context.lineTo(newPointX, newPointY);
    }
  }

  context.stroke();
};

export const drawCircle = (
  context: CanvasRenderingContext2D,
  radius: number,
  startPoint: Coords,
  color: string
) => {
  if (!context) return;

  context.beginPath();
  context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
};

export const drawCenteredCross = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#7773";

  ctx.moveTo(CENTER_POINT.x, CENTER_POINT.y - HALF_SIZE);
  ctx.lineTo(CENTER_POINT.x, CENTER_POINT.y + HALF_SIZE);
  ctx.moveTo(CENTER_POINT.x - HALF_SIZE, CENTER_POINT.y);
  ctx.lineTo(CENTER_POINT.x + HALF_SIZE, CENTER_POINT.y);
  ctx.stroke();
};
