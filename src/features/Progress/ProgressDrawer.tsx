import React from "react";
import { drawCircle, drawStroke, getSpiral } from "shared/utils";
import { Coords } from "shared/types";
import {
  fibonacciNumsForTimer,
  fibonacciMinsToSeconds,
  fibonacciColors,
} from "shared/constants";

interface Props {
  progress: number;
}

export const ProgressDrawer: React.FC<Props> = ({ progress }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const canvasSize = 2520;
  const halfSize = canvasSize / 2;

  const center = React.useMemo(() => {
    return {
      x: halfSize,
      y: halfSize,
    };
  }, [halfSize]);

  const drawFibonacciProgression = React.useCallback(
    (firstPoint: Coords, secondPoint: Coords) => {
      const ctx = canvasRef?.current?.getContext("2d");
      ctx?.clearRect(0, 0, canvasSize, canvasSize);

      if (ctx) {
        const radius = progress < canvasSize ? progress : canvasSize;
        const ancorSpiral = getSpiral(firstPoint, secondPoint, halfSize);
        const spiral = getSpiral(firstPoint, secondPoint, radius);

        ctx.globalAlpha = 0.66;

        fibonacciNumsForTimer.forEach((n, i) => {
          const second = fibonacciMinsToSeconds[i];
          const color = progress >= second ? fibonacciColors[i] : "#7772";

          drawCircle(ctx, second, center, color);
        });

        ctx.lineWidth = 2;
        ctx.lineCap = "square";
        ctx.strokeStyle = "#999";
        drawStroke(ctx, ancorSpiral, center);

        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#fff";
        drawStroke(ctx, spiral, center);
      }
    },
    [center, halfSize, progress]
  );

  React.useEffect(() => {
    const firstPoint = { x: 0, y: 0 };
    const secondPoint = { x: -2.17, y: -2.17 };

    drawFibonacciProgression(firstPoint, secondPoint);
  }, [center.x, center.y, drawFibonacciProgression, progress]);

  return (
    <canvas ref={canvasRef} width={canvasSize} height={canvasSize}></canvas>
  );
};