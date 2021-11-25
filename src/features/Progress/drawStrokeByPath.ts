import { Coords } from "shared/types"

// TODO: solve linter issue
// eslint-disable-next-line max-statements
export const drawStrokeByPath = (
  context: CanvasRenderingContext2D,
  points: Coords[],
  offset: Coords = { x: 0, y: 0 },
  color: string
) => {
  if (!context) return

  context.beginPath()

  context.lineWidth = 28
  context.lineCap = "round"
  context.strokeStyle = color

  // TODO: extract to function
  for (let i = 0; i < points.length; i++) {
    const point = points[i]
    const newPointX = offset.x + point.x
    const newPointY = offset.y + point.y

    if (i === 0) {
      context.moveTo(newPointX, newPointY)
    } else {
      context.lineTo(newPointX, newPointY)
    }
  }

  context.stroke()
}
