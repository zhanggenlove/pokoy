import { Coords } from "shared/types"

export const drawCircle = (
  context: CanvasRenderingContext2D,
  radius: number,
  startPoint: Coords,
  color: string
) => {
  if (!context) return

  context.beginPath()
  context.fillStyle = color
  context.strokeStyle = color
  context.lineWidth = 36
  context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI)
  context.fill()
}
