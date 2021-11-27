/** getting approximate value from fibonacci sequence */
const getFibDiscrete = (n: number) => {
  const SEQUENCE = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
  while (n >= SEQUENCE.length) {
    const { length } = SEQUENCE
    const nextFibonacciNum = SEQUENCE[length - 1] + SEQUENCE[length - 2]

    SEQUENCE.push(nextFibonacciNum)
  }

  return SEQUENCE[n]
}

// WTF!?
// eslint-disable-next-line max-statements
const getNumber = (num: number) => {
  const floorRoundedNum = Math.floor(num)
  const ceilRoundedNum = Math.ceil(num)

  if (floorRoundedNum === num) {
    return getFibDiscrete(num)
  }

  const FIB_RATIO = 1.1618
  const a = Math.pow(num - floorRoundedNum, FIB_RATIO)
  const fibDiscreteFromFloor = getFibDiscrete(floorRoundedNum)
  const fibDiscreteFromCeil = getFibDiscrete(ceilRoundedNum)

  /* WTF */
  return fibDiscreteFromFloor + a * (fibDiscreteFromCeil - fibDiscreteFromFloor)
}

// TODO: extract to constants
const COLORS = [
  "white",
  "gray",
  "blue",
  "yellow",
  "orange",
  "brown",
  "purple",
  "black",
]
const getColor = (n: number) => {
  const number = getNumber(n)
  return COLORS[number]
}

export const fibonacciUtils = { getColor, getNumber }
