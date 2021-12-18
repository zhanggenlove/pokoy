import {
  CENTER_POINT,
  HALF_SIZE,
} from "shared/components/progress/progress.constants"
import { getColorFromCSSVar } from "./utils"

// TODO: solve linter issue
// eslint-disable-next-line max-statements
export const drawCenteredCross = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.lineWidth = 1
  const color = getColorFromCSSVar("--c-spiral")
  ctx.strokeStyle = color

  ctx.moveTo(CENTER_POINT.x, CENTER_POINT.y - HALF_SIZE)
  ctx.lineTo(CENTER_POINT.x, CENTER_POINT.y + HALF_SIZE)
  ctx.moveTo(CENTER_POINT.x - HALF_SIZE, CENTER_POINT.y)
  ctx.lineTo(CENTER_POINT.x + HALF_SIZE, CENTER_POINT.y)
  ctx.stroke()
}
