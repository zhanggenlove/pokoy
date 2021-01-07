import { getFibonacciDiscrete } from "./utils";

describe("getFibonacciDiscrete", () => {
  it("should return properly values", () => {
    const inputValues = [0, 1, 1.3, 1.8, 2.6, 40, 54, 55, 56, 101];
    const outputValues = [0, 1, 1, 2, 3, 34, 55, 55, 55, 89];
    const results = inputValues.map((n) => getFibonacciDiscrete(n));

    expect(results).toEqual(outputValues);
  });
});
