import { fibonacciNums } from "shared/constants"

export const getFibonacciDiscrete = (minute: number) => {
  const fibDiscrete = fibonacciNums.reduce((acc, fibNum) => {
    const curDiff = Math.abs(fibNum - minute)
    const prevDiff = Math.abs(acc - minute)
    const isCloserToDiscrete = curDiff < prevDiff

    return isCloserToDiscrete ? fibNum : acc
  }, Infinity)

  return fibDiscrete
}
