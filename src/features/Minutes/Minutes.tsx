import React from "react";
import { fibonacciNums } from "shared/constants";
import { getFibonacciDiscrete } from "shared/utils";
import styles from "./Minutes.module.css";

interface Props {
  seconds: number;
}

const SECS_IN_MIN = 60;

export const Minutes: React.FC<Props> = ({ seconds }) => {
  const [stage, setStage] = React.useState(0);

  const timerProgressToMinutes = React.useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / SECS_IN_MIN);
    const closestFibonacciDiscrete = getFibonacciDiscrete(minutes);

    const nextStageIndex = fibonacciNums.indexOf(closestFibonacciDiscrete) + 1;
    const nextStage = fibonacciNums[nextStageIndex];
    const currentStage =
      minutes < closestFibonacciDiscrete ? nextStage : closestFibonacciDiscrete;

    setStage(currentStage);
  }, []);

  React.useEffect(() => {
    if (seconds) {
      timerProgressToMinutes(seconds);
    }
  }, [seconds, timerProgressToMinutes]);

  React.useEffect(() => {
    if (seconds === 0) {
      setStage(0);
    }
  }, [stage, seconds]);

  return (
    <span className={styles.minutes} title="Достигнутый этап в минутах">
      {stage}m
    </span>
  );
};
