import { getFibonacciDiscrete } from "shared/utils/getFibonacciDiscrete"
import { getFloorFibonacciDiscrete } from "features/Progress/getFloorFibonacciDiscrete"

describe("getFibonacciDiscrete", () => {
  it("should return properly values", () => {
    const outputToInputMap = {
      0: 0.1,
      1: 1.3,
      2: 2.5,
      3: 3,
      13: 11,
      34: 34,
      55: 55,
      89: 101,
    }
    const inputValues = Object.values(outputToInputMap)
    const outputValues = Object.keys(outputToInputMap).map((v) => +v)
    const results = inputValues.map((n) => getFibonacciDiscrete(n))

    expect(results).toEqual(outputValues)
  })

  it("Bug: should return 13 discrete number on 11 input", () => {
    const result = getFibonacciDiscrete(11)
    expect(result).toEqual(13)
  })
})

describe("getFloorFibDiscrete", () => {
  it("should return properly values", () => {
    const outputToInputMap = {
      0: 0.1,
      1: 1.3,
      2: 2.5,
      3: 3,
      8: 11,
      13: 14,
      34: 34,
      55: 55,
      89: 101,
    }
    const inputValues = Object.values(outputToInputMap)
    const outputValues = Object.keys(outputToInputMap).map((v) => +v)
    const result = inputValues.map((n) => getFloorFibonacciDiscrete(n))
    expect(result).toEqual(outputValues)
  })
})
