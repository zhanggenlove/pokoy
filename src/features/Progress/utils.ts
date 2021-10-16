import { fibNumToColorMap } from "shared/constants";

type ColorHex = string;

export const getFibColor = (
  fibNum: number,
  theme: "dark" | "light"
): ColorHex => {
  return fibNumToColorMap[theme][fibNum];
};
