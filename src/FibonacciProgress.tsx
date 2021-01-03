import React from 'react';
import { FibonacciGenerator } from './FibonacciGenerator';

interface Coords {
  x: number;
  y: number
}

// TODO: complete fibonacci progress drawing
export const FibonacciProgress = ({value}: {value: number}) => {
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)
  
  React.useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    
    setWidth(ctx?.canvas.width || 0)
    setHeight(ctx?.canvas.height || 0)
  }, [])

  const center = React.useMemo(() => ({
      x: width / 2,
      y: height / 2
  }), [height, width])

  const getSpiral = React.useCallback((firstPoint, secondPoint, maxRadius) => {
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
  }, [])

  const drawFibonacciSpiral = React.useCallback((
    firstPoint: Coords,
    secondPoint: Coords
  ) => {
    const ctx = canvas?.current?.getContext("2d");

    ctx?.clearRect(0, 0, width, height);
    
    // const initialValues = { x: 0, y: 0 }
    // const radius = getDistance(initialValues, center)
    const spiral = getSpiral(firstPoint, secondPoint, value)

    drawStroke(spiral, center, '#fff');
  }, [center, getSpiral, height, value, width])
  
  React.useEffect(() => {
    const firstPoint = { x: 0, y: 0 }
    const secondPoint = { x: 1, y: 1 }

    drawFibonacciSpiral(firstPoint, secondPoint);
  }, [center.x, center.y, drawFibonacciSpiral, value])

  const getDistance = (
    firstPoint: Coords, 
    secondPoint: Coords
  ) => {
    const deltaX = firstPoint.x - secondPoint.x
    const deltaY = firstPoint.y - secondPoint.y
    
    /** pythagoras theorem for distance */
    const distance = Math.sqrt(deltaX**2 + deltaY**2);

    return distance
  };

  const getAngle = function(firstPoint: Coords, secondPoint: Coords){
    const deltaX = secondPoint.x - firstPoint.x
    const deltaY = secondPoint.y - firstPoint.y
    const radians = Math.atan2(deltaY, deltaX);

    //radians into degrees
    // const angle = radians * (180 / Math.PI);
    
    return radians;
  };

  const drawStroke = ( points: Coords[], offset: Coords = { x: 0, y: 0 }, strokeColor: string = 'black') => {
    const ctx = canvas?.current?.getContext("2d");

    if (!ctx) return

    ctx.strokeStyle = strokeColor;
    ctx?.beginPath();
    
    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      if (i === 0) {
        ctx.moveTo(offset.x + point.x, offset.y + point.y);
      } else {
        ctx.lineTo(offset.x + point.x, offset.y + point.y);
      }
    }

    ctx.stroke();
  };

  return <canvas ref={canvas} width="600" height="600"></canvas>
}