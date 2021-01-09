import React from "react";
import { fibonacciNums } from "shared/constants";
import { getFibonacciDiscrete } from "shared/utils";

interface Props {
  seconds: number;
}

export const Countdown: React.FC<Props> = ({ seconds }) => {
  const [secondsRemain, setSecondsRemain] = React.useState(0);
  const [minutesRemain, setMinutesRemain] = React.useState(0);

  const setTimeRemainByFibonacci = React.useCallback(
    (stage: number) => {
      const secondsRemain =
        minutesRemain * 60 > seconds
          ? minutesRemain * 60 - seconds
          : (minutesRemain + 1) * 60 -
            ((minutesRemain + 1) * 60 - seconds + minutesRemain * 60);
      console.log("🚀 ~ secondsRemain", secondsRemain);

      setSecondsRemain(secondsRemain);
    },
    [minutesRemain, seconds]
  );

  const timerProgressToCountdown = React.useCallback(
    (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      setMinutesRemain(minutes);

      const discreteStage = getFibonacciDiscrete(minutes);
      // console.log("🚀 ~ discrete", seconds, minutes, discreteStage)

      for (const num of fibonacciNums) {
        if (discreteStage === num) {
          setTimeRemainByFibonacci(num);
        }
      }
    },
    [setTimeRemainByFibonacci]
  );

  React.useEffect(() => {
    if (seconds) {
      timerProgressToCountdown(seconds);
    }
  }, [seconds, timerProgressToCountdown]);

  const remainSecondsToDigitClock = React.useCallback(() => {
    // console.log("🚀 ~ remainSecondsToDigitClock ~ minutesRemain", minutesRemain)
    const formattedMinsRemain =
      minutesRemain < 10 ? `0${minutesRemain}` : `${minutesRemain}`;

    // const remainder = secondsRemain - minutesRemain * 60;
    const formattedRemainder =
      secondsRemain < 10 ? `0${secondsRemain}` : `${secondsRemain}`;

    return `${formattedMinsRemain}:${formattedRemainder}`;
  }, [minutesRemain, secondsRemain]);

  return <div>{remainSecondsToDigitClock()}</div>;
};
