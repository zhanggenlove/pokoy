import useSound from "use-sound";
import React from "react";
import gongSfx from "./gong.mp3";
import { fibonacciNumsForTimer } from "shared/constants";

interface Props {
  progress: number;
}

export const Sound: React.FC<Props> = ({ progress }) => {
  const [playGong] = useSound(gongSfx);

  React.useEffect(() => {
    const minutes = progress / 60;
    const isFibNum = fibonacciNumsForTimer.includes(minutes);

    if (isFibNum) {
      playGong();
    }
  }, [progress, playGong]);

  return null;
};
