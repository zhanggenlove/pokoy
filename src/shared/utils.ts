import { fibonacciNums } from "./constants";

export const getFibonacciDiscrete = (minute: number) => {
  const fibDiscrete = fibonacciNums.reduce((acc, fibNum) => {
    const curDiff = Math.abs(fibNum - minute);
    const prevDiff = Math.abs(acc - minute);
    const isCloserToDiscrete = curDiff < prevDiff;

    return isCloserToDiscrete ? fibNum : acc;
  }, Infinity);

  return fibDiscrete;
};

export const getFloorFibonacciDiscrete = (minutes: number) => {
  const checkDiscrete = (acc: number, fibNum: number, index: number) => {
    const curDiff = Math.abs(fibNum - minutes);
    const prevDiff = Math.abs(acc - minutes);
    const isLessThanMinutes = minutes >= fibNum;
    const isCloserToDiscrete = curDiff < prevDiff;
    const closestFib = isCloserToDiscrete ? fibNum : acc;

    return isLessThanMinutes ? closestFib : acc;
  };
  const fibDiscrete = fibonacciNums.reduce(checkDiscrete, 0);

  return fibDiscrete;
};

export const remainTimeToDigitClock = (
  secondsRemain: number,
  minutesRemain: number
): string => {
  const formattedMinsRemain =
    minutesRemain < 10 ? `0${minutesRemain}` : `${minutesRemain}`;

  const formattedRemainder =
    secondsRemain < 10 ? `0${secondsRemain}` : `${secondsRemain}`;

  return `${formattedMinsRemain}:${formattedRemainder}`;
};
