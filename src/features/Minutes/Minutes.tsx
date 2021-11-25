import { getFloorFibonacciDiscrete } from "features/Progress/getFloorFibonacciDiscrete"
import React from "react"
import { fibonacciNums, SECS_IN_MIN } from "shared/constants"
import styles from "./Minutes.module.css"

interface Props {
  seconds: number
}

// TODO: change props to minutes
export const Minutes: React.FC<Props> = ({ seconds }) => {
  const [stage, setStage] = React.useState(0)

  // TODO: extract function
  const timerProgressToMinutes = React.useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / SECS_IN_MIN)
    const closestFibonacciDiscrete = getFloorFibonacciDiscrete(minutes)

    const nextStageIndex = fibonacciNums.indexOf(closestFibonacciDiscrete) + 1
    const nextStage =
      closestFibonacciDiscrete > minutes
        ? closestFibonacciDiscrete
        : fibonacciNums[nextStageIndex]

    const currentStage =
      minutes < closestFibonacciDiscrete ? nextStage : closestFibonacciDiscrete

    return currentStage
  }, [])

  React.useEffect(() => {
    if (seconds) {
      const newStage = timerProgressToMinutes(seconds)
      setStage(newStage)
    }
  }, [seconds, timerProgressToMinutes])

  React.useEffect(() => {
    if (seconds === 0) {
      setStage(0)
    }
  }, [stage, seconds])

  return (
    <span className={styles.minutes} title="Достигнутый этап в минутах">
      Пройден этап в {stage} мин
    </span>
  )
}
