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

export const getSpiral = (
  firstPoint: Coords,
  secondPoint: Coords,
  maxRadius: number
) => {
  // 1 step = 1/4 turn or 90º
  const precision = 50; // Lines to draw in each 1/4 turn
  const stepB = 4; // Steps to get to point B
  const angleToPointB = getAngle(firstPoint, secondPoint);
  const distToPointB = getDistance(firstPoint, secondPoint);
  const fibonacci = new FibonacciGenerator();

  // Find angle offset so that last point of the curve is at angle to secondPoint
  const angleOffset = angleToPointB - (stepB * Math.PI) / 2;
  const path = [];

  // Find scale so that the last point of the curve is at distance to secondPoint
  const radiusB = fibonacci.getNumber(stepB);
  const scale = distToPointB / radiusB;

  // Start at the center
  let i = 0;
  let radius = 0;
  let angle = 0;

  console.log("🚀 ~ file: utils.ts ~ line 60 ~ radius", radius);
  // Continue drawing until reaching maximum radius
  // FIXME: memory stack on extracting `radius * scale` in variable in cause of while loop scope visibility
  while (radius * scale <= maxRadius) {
    console.log("🚀 ~ file: utils.ts ~ line 60 ~ radius", radius);
    const scaledRadius = scale * radius;
    const newAngle = angle + angleOffset;
    const newX = scaledRadius * Math.cos(newAngle) + firstPoint.x;
    const newY = scaledRadius * Math.sin(newAngle) + firstPoint.y;

    const point = {
      x: newX,
      y: newY,
    };

    path.push(point);

    i++; // Next point
    const step = i / precision; // 1/4 turns at point

    radius = fibonacci.getNumber(step); // Radius of Fibonacci spiral
    angle = (step * Math.PI) / 2; // Radians at point
  }

  return path;
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
  strokeColor: string = "#777"
) => {
  if (!context) return;

  context.lineWidth = 8;
  context.lineCap = "round";
  context.strokeStyle = strokeColor;
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

export const drawCircle = (context: CanvasRenderingContext2D) => {
  if (!context) return;

  context.beginPath();
  context.arc(300, 300, 300, 0, 2 * Math.PI);
  context.fillStyle = "#7777";
  context.fill();
};
