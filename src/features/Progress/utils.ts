import { fibNumToColorMap } from "shared/constants";

type ColorHex = string;

export const getFibColor = (fibNum: number): ColorHex => {
  return fibNumToColorMap[fibNum];
};
