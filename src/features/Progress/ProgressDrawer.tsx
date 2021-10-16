import React from "react";
import { drawCircle, drawStroke, getSpiral } from "shared/spiral-utils";
import { getFloorFibonacciDiscrete } from "shared/utils";
import { getFibColor } from "./utils";
import styles from "./Progress.module.css";
import {
  CANVAS_SIZE,
  CENTER_POINT,
  FIRST_POINT,
  HALF_SIZE,
  SECOND_POINT,
} from "./progress.constants";

interface Props {
  progress: number;
}

// TODO: refactor component
export const ProgressDrawer: React.FC<Props> = ({ progress }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const bgSpiral = React.useMemo(
    // NOTE: slicing array from start to optimize points amount to draw
    () => getSpiral(FIRST_POINT, SECOND_POINT, HALF_SIZE).slice(220),
    []
  );

  const drawFibonacciProgression = React.useCallback(() => {
    const ctx = canvasRef?.current?.getContext("2d");
    const radius = progress < CANVAS_SIZE ? progress : CANVAS_SIZE;
    const minutes = Math.floor(progress / 60);
    const fibStage = getFloorFibonacciDiscrete(minutes);
    const theme = window?.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const color = getFibColor(fibStage, theme);

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.globalCompositeOperation = "destination-atop";

    // NOTE: draw growing circle from center of spiral
    drawCircle(ctx, radius, CENTER_POINT, color);

    // NOTE: draw cross at center of circle
    // drawCenteredCross(ctx);

    // NOTE: draw spiral path
    const LAST_TIMER_STAGE = 21;
    const spiralColor = getFibColor(LAST_TIMER_STAGE, theme);
    drawStroke(ctx, bgSpiral, CENTER_POINT, spiralColor);
  }, [progress, bgSpiral]);

  React.useEffect(() => {
    drawFibonacciProgression();
  }, [drawFibonacciProgression, progress]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      className={styles.canvas}
    ></canvas>
  );
};
