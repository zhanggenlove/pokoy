import { FibonacciGenerator } from "features/Progress/FibonacciGenerator";
import { fibonacciNums } from "./constants";
import { Coords } from "./types";

// TODO: refactor this methods
export const getAngle = (firstPoint: Coords, secondPoint: Coords) => {
  const deltaX = secondPoint.x - firstPoint.x;
  const deltaY = secondPoint.y - firstPoint.y;
  const radians = Math.atan2(deltaY, deltaX);

  //radians into degrees
  // const angle = radians * (180 / Math.PI);

  return radians;
};

export const getDistance = (firstPoint: Coords, secondPoint: Coords) => {
  const deltaX = firstPoint.x - secondPoint.x;
  const deltaY = firstPoint.y - secondPoint.y;

  /** pythagoras theorem for distance */
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  return distance;
};

const fibonacci = new FibonacciGenerator();

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

const getScale = (distance: number, stepsToNext: number) => {
  // Find scale so that the last point of the curve is at distance to secondPoint
  const radiusToSecondPoint = fibonacci.getNumber(stepsToNext);

  return distance / radiusToSecondPoint;
};

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
  offset: Coords = { x: 0, y: 0 }
) => {
  if (!context) return;

  context.beginPath();

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

export const getFibonacciDiscrete = (minute: number) => {
  const fibDiscrete = fibonacciNums.reduce((acc, fibNum) => {
    const curDiff = Math.abs(fibNum - minute);
    const prevDiff = Math.abs(acc - minute);
    const isCloserToDiscrete = curDiff < prevDiff;

    return isCloserToDiscrete ? fibNum : acc;
  }, Infinity);

  return fibDiscrete;
};
export const getFloorFibonacciDiscrete = (minutes: number) => {
  const checkDiscrete = (acc: number, fibNum: number, index: number) => {
    const curDiff = Math.abs(fibNum - minutes);
    const prevDiff = Math.abs(acc - minutes);
    const isLessThanMinutes = minutes >= fibNum;
    const isCloserToDiscrete = curDiff < prevDiff;
    const closestFib = isCloserToDiscrete ? fibNum : acc;

    return isLessThanMinutes ? closestFib : acc;
  };
  const fibDiscrete = fibonacciNums.reduce(checkDiscrete, 0);

  return fibDiscrete;
};

export const remainTimeToDigitClock = (
  secondsRemain: number,
  minutesRemain: number
): string => {
  const formattedMinsRemain =
    minutesRemain < 10 ? `0${minutesRemain}` : `${minutesRemain}`;

  const formattedRemainder =
    secondsRemain < 10 ? `0${secondsRemain}` : `${secondsRemain}`;

  return `${formattedMinsRemain}:${formattedRemainder}`;
};
