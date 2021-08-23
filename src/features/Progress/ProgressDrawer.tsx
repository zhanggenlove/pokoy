import React from "react";
import {
  drawCircle,
  drawStroke,
  drawCenteredCross,
  getSpiral,
} from "shared/spiral-utils";
import { fibNumToColorMap } from "shared/constants";
import styles from "./Progress.module.css";
import { getFloorFibonacciDiscrete } from "shared/utils";
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
    const color = fibNumToColorMap[fibStage];

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // NOTE: draw cross at center of circle
    drawCenteredCross(ctx);

    ctx.globalCompositeOperation = "destination-atop";
    // NOTE: draw growing circle from center of spiral
    drawCircle(ctx, radius, CENTER_POINT, color);

    // NOTE: draw spiral path
    drawStroke(ctx, bgSpiral, CENTER_POINT);
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
