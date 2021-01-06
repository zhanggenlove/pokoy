import React from "react";
import { drawCircle, drawStroke, getSpiral } from "shared/utils";
import { Coords } from "shared/types";

interface Props {
  progress: number;
}

export const ProgressDrawer: React.FC<Props> = ({ progress }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const canvasSize = 600;

  const center = React.useMemo(
    () => ({
      x: canvasSize / 2,
      y: canvasSize / 2,
    }),
    [canvasSize]
  );

  const drawFibonacciSpiral = React.useCallback(
    (firstPoint: Coords, secondPoint: Coords) => {
      const ctx = canvasRef?.current?.getContext("2d");
      ctx?.clearRect(0, 0, canvasSize, canvasSize);

      // const radius = getDistance({ x: 0, y: 0 }, center)

      if (ctx) {
        const radius = progress < 300 ? progress : 300;
        const spiral = getSpiral(firstPoint, secondPoint, radius);

        drawCircle(ctx);
        drawStroke(ctx, spiral, center, "#fff");
      }
    },
    [center, canvasSize, progress]
  );

  React.useEffect(() => {
    const firstPoint = { x: 0, y: 0 };
    const secondPoint = { x: 1, y: 1 };

    drawFibonacciSpiral(firstPoint, secondPoint);
  }, [center.x, center.y, drawFibonacciSpiral]);

  return (
    <canvas ref={canvasRef} width={canvasSize} height={canvasSize}></canvas>
  );
};
