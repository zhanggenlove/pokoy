import { CENTER_POINT, HALF_SIZE } from "features/Progress/progress.constants";

// TODO: solve linter issue
// eslint-disable-next-line max-statements
export const drawCenteredCross = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#7773";

  // TODO: extract to function
  ctx.moveTo(CENTER_POINT.x, CENTER_POINT.y - HALF_SIZE);
  ctx.lineTo(CENTER_POINT.x, CENTER_POINT.y + HALF_SIZE);
  ctx.moveTo(CENTER_POINT.x - HALF_SIZE, CENTER_POINT.y);
  ctx.lineTo(CENTER_POINT.x + HALF_SIZE, CENTER_POINT.y);
  ctx.stroke();
};
