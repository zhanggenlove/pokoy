import useSound from "use-sound";
import React from "react";
import gongSfx from "./gong.mp3";
import { fibonacciNums } from "shared/constants";

interface Props {
  progress: number;
}

export const Sound: React.FC<Props> = ({ progress }) => {
  const [playGong] = useSound(gongSfx);

  React.useEffect(() => {
    console.log(progress);

    if (fibonacciNums.includes(progress)) {
      playGong();
    }
  }, [progress, playGong]);

  return null;
};
