import React from "react";
import { fibonacciNums } from "shared/constants";
import { getFibonacciDiscrete } from "shared/utils";

interface Props {
  seconds: number;
}

export const DigitCountdown: React.FC<Props> = ({ seconds }) => {
  const [secondsRemain, setSecondsRemain] = React.useState(0);

  const setTimeRemainByFibonacci = React.useCallback(
    (stage: number) => {
      const secondsRemain = stage > 0 ? stage * 60 - seconds : 60 - seconds;

      setSecondsRemain(secondsRemain);
    },
    [seconds]
  );

  const timerProgressToCountdown = React.useCallback(
    (minutes: number) => {
      const discrete = getFibonacciDiscrete(minutes);

      for (const num of fibonacciNums) {
        if (discrete === num) {
          setTimeRemainByFibonacci(num);
        }
      }
    },
    [setTimeRemainByFibonacci]
  );

  React.useEffect(() => {
    const minutes = seconds / 60;
    timerProgressToCountdown(minutes);
  }, [seconds, timerProgressToCountdown]);

  const remainSecondsToDigitClock = React.useCallback(() => {
    const minsRemain = Math.floor(secondsRemain / 60);
    const formattedMinsRemain =
      minsRemain < 10 ? `0${minsRemain}` : `${minsRemain}`;

    const remainder = secondsRemain - minsRemain * 60;
    const formattedRemainder =
      remainder < 10 ? `0${remainder}` : `${remainder}`;

    return `${formattedMinsRemain}:${formattedRemainder}`;
  }, [secondsRemain]);

  return <div>{remainSecondsToDigitClock()}</div>;
};
