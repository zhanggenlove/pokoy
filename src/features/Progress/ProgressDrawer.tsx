import React from "react";
import { drawCircle, drawStroke, getSpiral } from "shared/spiral-utils";
import {
  fibonacciNumsForTimer,
  fibonacciMinsToSeconds,
  fibonacciColors,
} from "shared/constants";
import styles from "./Progress.module.css";

interface Props {
  progress: number;
}

// TODO: refactor component
export const ProgressDrawer: React.FC<Props> = ({ progress }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const CANVAS_SIZE = 2520; // FIXME: WTF, why 2520?
  const HALF_SIZE = CANVAS_SIZE / 2;
  const FIRST_POINT = React.useMemo(() => ({ x: 0, y: 0 }), []);
  const SECOND_POINT = React.useMemo(() => ({ x: -2.17, y: -2.17 }), []); // rough value for nice rotate angle of spiral
  const bgSpiral = React.useMemo(
    () => getSpiral(FIRST_POINT, SECOND_POINT, HALF_SIZE),
    [FIRST_POINT, HALF_SIZE, SECOND_POINT]
  );

  const center = React.useMemo(() => {
    return {
      x: HALF_SIZE,
      y: HALF_SIZE,
    };
  }, [HALF_SIZE]);

  const drawStageCircles = React.useCallback(
    (ctx: CanvasRenderingContext2D, progress: number) => {
      fibonacciNumsForTimer.forEach((n, i) => {
        const seconds = fibonacciMinsToSeconds[i];
        const defaultColor = "#7772";
        const color = progress >= seconds ? fibonacciColors[i] : defaultColor;

        drawCircle(ctx, seconds, center, color);
      });
    },
    [center]
  );

  const drawFibonacciProgression = React.useCallback(() => {
    const ctx = canvasRef?.current?.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.globalAlpha = 0.33;

    const radius = progress < CANVAS_SIZE ? progress : CANVAS_SIZE;
    const spiral = getSpiral(FIRST_POINT, SECOND_POINT, radius);

    drawStageCircles(ctx, progress);

    ctx.lineWidth = 24;
    ctx.lineCap = "square";
    ctx.strokeStyle = "#777";
    drawStroke(ctx, bgSpiral, center);

    ctx.lineWidth = 32;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#fff";
    drawStroke(ctx, spiral, center);
  }, [progress, FIRST_POINT, SECOND_POINT, drawStageCircles, bgSpiral, center]);

  React.useEffect(() => {
    drawFibonacciProgression();
  }, [center.x, center.y, drawFibonacciProgression, progress]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      className={styles.canvas}
    ></canvas>
  );
};
