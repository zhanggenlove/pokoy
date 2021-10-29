import React from "react";
import { drawCircle, drawStroke, getSpiralPath } from "shared/spiral-utils";
import { getFloorFibonacciDiscrete } from "shared/utils";
import { getColorStyleSheetVarName, getStyleSheetColor } from "./utils";
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
  const secondCanvasRef = React.useRef<HTMLCanvasElement>(null);

  // NOTE: computed spiral path
  const bgSpiral = React.useMemo(
    // NOTE: slicing array from start to optimize points amount to draw
    () => getSpiralPath(FIRST_POINT, SECOND_POINT, HALF_SIZE).slice(220),
    []
  );

  // FIXME: WIP method for subspirals on stage endings
  const drawSubSpirals = React.useCallback(() => {
    const ctx = secondCanvasRef?.current?.getContext("2d");

    if (!ctx) {
      return;
    }

    const growPoint = { x: HALF_SIZE, y: HALF_SIZE };
    getSpiralPath(FIRST_POINT, SECOND_POINT, HALF_SIZE).slice(220);
    const spiralColor = getStyleSheetColor("--c-spiral");
    drawStroke(ctx, bgSpiral, growPoint, spiralColor, 100);
  }, [bgSpiral]);

  const drawFibonacciProgression = React.useCallback(() => {
    const ctx = canvasRef?.current?.getContext("2d");
    const radius = progress < CANVAS_SIZE ? progress : CANVAS_SIZE;
    const minutes = Math.floor(progress / 60);
    const fibStage = getFloorFibonacciDiscrete(minutes);
    const colorCSSVarName = getColorStyleSheetVarName(fibStage);
    const color = getStyleSheetColor(colorCSSVarName);

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    // ctx.globalCompositeOperation = "destination-atop";

    // NOTE: draw growing circle from center of spiral for filling effect
    drawCircle(ctx, radius, CENTER_POINT, color);

    // NOTE: draw spiral path at background
    const spiralColor = getStyleSheetColor("--c-spiral");
    // FIXME: temp
    drawStroke(
      ctx,
      getSpiralPath(FIRST_POINT, SECOND_POINT, HALF_SIZE).slice(220, -155),
      CENTER_POINT,
      spiralColor,
      55
    );
    drawStroke(
      ctx,
      getSpiralPath(FIRST_POINT, SECOND_POINT, HALF_SIZE).slice(220, -115),
      CENTER_POINT,
      spiralColor,
      34
    );
    drawStroke(
      ctx,
      getSpiralPath(FIRST_POINT, SECOND_POINT, HALF_SIZE).slice(220, -80),
      CENTER_POINT,
      spiralColor,
      21
    );
    drawStroke(
      ctx,
      getSpiralPath(FIRST_POINT, SECOND_POINT, HALF_SIZE).slice(220, -35),
      CENTER_POINT,
      spiralColor,
      13
    );
    drawStroke(
      ctx,
      getSpiralPath(FIRST_POINT, SECOND_POINT, HALF_SIZE).slice(220),
      CENTER_POINT,
      spiralColor,
      8
    );
    // drawStroke(ctx, bgSpiral, CENTER_POINT, spiralColor);
  }, [progress, bgSpiral]);

  React.useEffect(() => {
    drawFibonacciProgression();
    drawSubSpirals();
  }, [drawFibonacciProgression, drawSubSpirals, progress]);

  return (
    <>
      {/* //FIXME: WIP method for subspirals on stage endings */}
      {/* <canvas
        ref={secondCanvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className={styles.canvasSecondLayer}
      ></canvas> */}
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className={styles.canvas}
      ></canvas>
    </>
  );
};
