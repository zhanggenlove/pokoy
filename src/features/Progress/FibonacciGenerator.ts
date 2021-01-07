export class FibonacciGenerator {
  sequence: number[];
  colors: string[];

  constructor() {
    this.sequence = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    this.colors = [
      "white",
      "gray",
      "blue",
      "yellow",
      "orange",
      "brown",
      "purple",
      "black",
    ];
  }

  /** getting approximate value from fibonacci sequence */
  getDiscrete(n: number) {
    while (n >= this.sequence.length) {
      const length = this.sequence.length;
      const nextFibonacciNum =
        this.sequence[length - 1] + this.sequence[length - 2];

      this.sequence.push(nextFibonacciNum);
    }

    return this.sequence[n];
  }

  getNumber(n: number) {
    const floor = Math.floor(n);
    const ceil = Math.ceil(n);

    if (floor === n) {
      return this.getDiscrete(n);
    }

    const a = Math.pow(n - floor, 1.15 /* WTF */);
    const fibFloor = this.getDiscrete(floor);
    const fibCeil = this.getDiscrete(ceil);

    return fibFloor + a * (fibCeil - fibFloor) /* WTF */;
  }

  getColor(n: number) {
    const number = this.getNumber(n);

    return this.colors[number];
  }
}
