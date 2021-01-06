import React from "react";
import { drawCircle, drawStroke, getSpiral } from "../../shared/utils";

interface Coords {
  x: number;
  y: number;
}

// TODO: complete fibonacci progress drawing
export const FibonacciProgress = ({ value }: { value: number }) => {
  const canvasSize = 600;
  const canvas = React.useRef<HTMLCanvasElement>(null);

  const center = React.useMemo(
    () => ({
      x: canvasSize / 2,
      y: canvasSize / 2,
    }),
    [canvasSize]
  );

  const drawFibonacciSpiral = React.useCallback(
    (firstPoint: Coords, secondPoint: Coords) => {
      const ctx = canvas?.current?.getContext("2d");
      ctx?.clearRect(0, 0, canvasSize, canvasSize);

      // const radius = getDistance({ x: 0, y: 0 }, center)

      if (ctx) {
        const radius = value < 300 ? value : 300;
        const spiral = getSpiral(firstPoint, secondPoint, radius);

        drawCircle(ctx);
        drawStroke(ctx, spiral, center, "#fff");
      }
    },
    [center, canvasSize, value]
  );

  React.useEffect(() => {
    const firstPoint = { x: 0, y: 0 };
    const secondPoint = { x: 1, y: 1 };

    drawFibonacciSpiral(firstPoint, secondPoint);
  }, [center.x, center.y, drawFibonacciSpiral, value]);

  return <canvas ref={canvas} width={canvasSize} height={canvasSize}></canvas>;
};
