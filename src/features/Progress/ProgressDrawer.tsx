import React from "react"
import { getColorStyleSheetVarName, getColorFromCSSVar } from "./utils"
import styles from "./Progress.module.css"
import {
  CANVAS_SIZE,
  CENTER_POINT,
  FIRST_POINT,
  HALF_SIZE,
  SECOND_POINT,
} from "./progress.constants"
import { getFibSpiral } from "features/Progress/getFibSpiral"
import { getFloorFibonacciDiscrete } from "features/Progress/getFloorFibonacciDiscrete"
import { drawStrokeByPath } from "features/Progress/drawStrokeByPath"
import { drawCircle } from "features/Progress/drawCircle"
import { drawCenteredCross } from "./drawCenteredCross"

interface Props {
  progress: number
}

// TODO: refactor component
export const ProgressDrawer: React.FC<Props> = ({ progress }) => {
  const spiralCanvasRef = React.useRef<HTMLCanvasElement>(null)
  const dotsCanvasRef = React.useRef<HTMLCanvasElement>(null)

  const bgSpiralPath = React.useMemo(() => {
    const numOfRendundantPoints = 220
    const slicedPath = getFibSpiral(FIRST_POINT, SECOND_POINT, HALF_SIZE).slice(
      numOfRendundantPoints
    )
    return slicedPath
  }, [])

  const drawFibonacciProgression = React.useCallback(
    (ctx) => {
      const radius = progress < CANVAS_SIZE ? progress : CANVAS_SIZE
      const minutes = Math.floor(progress / 60)
      const fibStage = getFloorFibonacciDiscrete(minutes)
      const colorCSSVarName = getColorStyleSheetVarName(fibStage)
      const color = getColorFromCSSVar(colorCSSVarName)

      if (!ctx) {
        return
      }

      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
      ctx.globalCompositeOperation = "destination-atop"

      // NOTE: draw growing circle from center of spiral
      drawCircle(ctx, radius, CENTER_POINT, color)

      // NOTE: draw spiral path
      const spiralColor = getColorFromCSSVar("--c-spiral")
      drawStrokeByPath(ctx, bgSpiralPath, CENTER_POINT, spiralColor)
    },
    [progress, bgSpiralPath]
  )

  React.useEffect(() => {
    const ctx1 = dotsCanvasRef?.current?.getContext("2d")
    const ctx2 = spiralCanvasRef?.current?.getContext("2d")

    if (ctx1 && ctx2) {
      drawCenteredCross(ctx1)
      drawFibonacciProgression(ctx2)
    }
  }, [bgSpiralPath, drawFibonacciProgression, progress])

  return (
    <>
      <canvas
        ref={dotsCanvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className={styles["centered-cross"]}
      ></canvas>
      <canvas
        ref={spiralCanvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className={styles["progress-spiral"]}
      ></canvas>
    </>
  )
}
