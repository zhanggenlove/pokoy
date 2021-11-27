import { fibonacciUtils } from "features/Progress/FibonacciGenerator"
import { Coords } from "shared/types"
import { getSpiralPath } from "./getSpiralPath"

export const getFibSpiral = (
  firstPoint: Coords,
  secondPoint: Coords,
  maxRadius: number
): Coords[] => {
  // 1 step = 1/4 turn or 90º
  const STEPS_TO_SECOND_POINT = 4 // Steps to get to second point

  const angleToSecondPoint = getAngle(firstPoint, secondPoint)
  // Find angle offset so that last point of the curve is at angle to secondPoint
  const angleOffset = angleToSecondPoint - (STEPS_TO_SECOND_POINT * Math.PI) / 2
  const distanceToSecondPoint = getDistance(firstPoint, secondPoint)
  const scale = getScale(distanceToSecondPoint, STEPS_TO_SECOND_POINT)

  return getSpiralPath(scale, maxRadius, angleOffset, firstPoint, 0, 0, 0, [])
}

export const getAngle = (firstPoint: Coords, secondPoint: Coords) => {
  const deltaX = secondPoint.x - firstPoint.x
  const deltaY = secondPoint.y - firstPoint.y
  const radians = Math.atan2(deltaY, deltaX)

  return radians
}

export const getDistance = (firstPoint: Coords, secondPoint: Coords) => {
  const deltaX = firstPoint.x - secondPoint.x
  const deltaY = firstPoint.y - secondPoint.y

  // NOTE: pythagoras theorem for distances
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

  return distance
}

export const getScale = (distance: number, stepsToNext: number) => {
  // Find scale so that the last point of the curve is at distance to secondPoint
  const radiusToSecondPoint = fibonacciUtils.getNumber(stepsToNext)

  return distance / radiusToSecondPoint
}
