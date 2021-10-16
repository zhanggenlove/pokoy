export const fibonacciNums = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
export const fibonacciNumsForTimer = [0, 1, 2, 3, 5, 8, 13, 21];
export const fibonacciMinsToSeconds = [60, 120, 180, 300, 480, 780, 1260];
export const fibonacciPercents = [1, 2, 3, 6, 9, 15, 24, 38, 62, 100];
export const fibonacciColors = {
  // NOTE: colors from Notion Colors website
  dark: [
    "#FF7369",
    "#FFA344",
    "#FFDC49",
    "#4DAB9A",
    "#529CCA",
    "#9A6DD7",
    "#E255A1",
    "#000",
  ],
  // TODO: add light notion colors
  light: [
    "#E03E3E",
    "#D9730D",
    "#DFAB01",
    "#0F7B6C",
    "#0B6E99",
    "#6940A5",
    "#AD1A72",
    "#EBECED",
  ],
};

export const fibNumToColorMap = {
  dark: {
    [fibonacciNumsForTimer[0]]: fibonacciColors["dark"][0],
    [fibonacciNumsForTimer[1]]: fibonacciColors["dark"][1],
    [fibonacciNumsForTimer[2]]: fibonacciColors["dark"][2],
    [fibonacciNumsForTimer[3]]: fibonacciColors["dark"][3],
    [fibonacciNumsForTimer[4]]: fibonacciColors["dark"][4],
    [fibonacciNumsForTimer[5]]: fibonacciColors["dark"][5],
    [fibonacciNumsForTimer[6]]: fibonacciColors["dark"][6],
    [fibonacciNumsForTimer[7]]: fibonacciColors["dark"][7],
  },
  light: {
    [fibonacciNumsForTimer[0]]: fibonacciColors["light"][0],
    [fibonacciNumsForTimer[1]]: fibonacciColors["light"][1],
    [fibonacciNumsForTimer[2]]: fibonacciColors["light"][2],
    [fibonacciNumsForTimer[3]]: fibonacciColors["light"][3],
    [fibonacciNumsForTimer[4]]: fibonacciColors["light"][4],
    [fibonacciNumsForTimer[5]]: fibonacciColors["light"][5],
    [fibonacciNumsForTimer[6]]: fibonacciColors["light"][6],
    [fibonacciNumsForTimer[7]]: fibonacciColors["light"][7],
  },
};
export const SERVER_URL = process.env.REACT_APP_SHEET_URL;
