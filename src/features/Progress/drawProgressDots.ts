import {
  fibNumToStyleSheetVarMap,
  fibonacciMinsToSeconds,
  FIB_NUMS_FOR_TIMER,
} from "shared/constants";
import { Coords } from "shared/types";
import { drawCircle } from "./drawCircle";
import { CANVAS_SIZE, CENTER_POINT } from "./progress.constants";
import { getColorFromCSSVar } from "./utils";

const getFibColor = (
  progress: number,
  index: number,
  styleSheetVarName: string
) =>
  progress < fibonacciMinsToSeconds[index]
    ? getColorFromCSSVar("--c-gray")
    : getColorFromCSSVar(styleSheetVarName);

const getCenterPoint = (index: number, bgSpiralPath: Coords[]) =>
  bgSpiralPath[200 + 40 * index];

const getPointWithOffset = (spiralPoint: { x: number; y: number }) => {
  return {
    x: CENTER_POINT.x + spiralPoint.x,
    y: CENTER_POINT.y + spiralPoint.y,
  };
};

export const drawProgressDots = (
  ctx: CanvasRenderingContext2D,
  progress: number,
  bgSpiralPath: Coords[]
) => {
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  FIB_NUMS_FOR_TIMER.forEach((fibNum, index, array) => {
    if (index > 6) return;

    const styleSheetVarName = fibNumToStyleSheetVarMap[array[index + 1]];
    const centerPoint = getCenterPoint(index, bgSpiralPath);

    drawCircle(
      ctx,
      8,
      getPointWithOffset(centerPoint),
      getFibColor(progress, index, styleSheetVarName)
    );
  });
};
