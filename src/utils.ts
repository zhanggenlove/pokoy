import { fibonacciNums } from './constants';
import { FibonacciGenerator } from './FibonacciGenerator';
import { Coords } from './types';

export const getAngle = (firstPoint: Coords, secondPoint: Coords) =>{
  const deltaX = secondPoint.x - firstPoint.x
  const deltaY = secondPoint.y - firstPoint.y
  const radians = Math.atan2(deltaY, deltaX);

  //radians into degrees
  // const angle = radians * (180 / Math.PI);
  
  return radians;
};

export const getDistance = (
  firstPoint: Coords, 
  secondPoint: Coords
) => {
  const deltaX = firstPoint.x - secondPoint.x
  const deltaY = firstPoint.y - secondPoint.y
  
  /** pythagoras theorem for distance */
  const distance = Math.sqrt(deltaX**2 + deltaY**2);

  return distance
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

  // Find scale so that the last point of the curve is at distance to secondPoint
  const radiusB = fibonacci.getNumber(stepB);
  const scale = distToPointB / radiusB;

  // Find angle offset so that last point of the curve is at angle to secondPoint
  const angleOffset = angleToPointB - stepB * Math.PI / 2;
  const path = [];

  let i, step , radius, angle, p;

  // Start at the center
  i = step = radius = angle = 0;

  // Continue drawing until reaching maximum radius
  while (radius * scale <= maxRadius){
      p = {
          x: scale * radius * Math.cos(angle + angleOffset) + firstPoint.x,
          y: scale * radius * Math.sin(angle + angleOffset) + firstPoint.y
      };

      path.push(p);

      i++; // Next point
      step = i / precision; // 1/4 turns at point    
      radius = fibonacci.getNumber(step); // Radius of Fibonacci spiral
      angle = step * Math.PI / 2; // Radians at point
  }

  return path;
}

export const getColor = (num: number) => {
  const isFibNum = fibonacciNums.includes(num)

  if (!isFibNum) return '#fff'

  const hex = num.toString(16)
  const hexArr = hex.split('')
  const newArr = Array(6 - hexArr.length).fill('F')
  
  return `#${hexArr.concat(newArr).join('')}`
}

export const drawStroke = (
  context: CanvasRenderingContext2D,
  points: Coords[],
  offset: Coords = { x: 0, y: 0 },
  strokeColor: string = 'black'
) => {
  if (!context) return

  context.lineWidth = 3;
  context.strokeStyle = strokeColor;
  
  context.beginPath();
  
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const newPointX = offset.x + point.x
    const newPointY = offset.y + point.y

    if (i === 0) {
      context.moveTo(newPointX, newPointY);
    } else {
      context.lineTo(newPointX, newPointY);
    }
  }

  context.stroke();
}

export const drawCircle = (context: CanvasRenderingContext2D) => {
  if (!context) return;

  context.beginPath();
  context.arc(300, 300, 300, 0, 2 * Math.PI);
  context.lineWidth = 2;
  context.strokeStyle = '#777';
  context.stroke()
}