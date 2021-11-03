import { Coords } from "shared/types";

export const drawCircle = (
  context: CanvasRenderingContext2D,
  radius: number,
  startPoint: Coords,
  color: string
) => {
  if (!context) return;

  context.beginPath();
  context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
};
