import useSound from "use-sound";
import React from "react";
import gongSfx from "./gong.mp3";
import { fibonacciNumsForTimer } from "shared/constants";

interface Props {
  progress: number;
}

export const Sound: React.FC<Props> = ({ progress }) => {
  const [playGong] = useSound(gongSfx, {
    volume: 0.001 /* comfort volume value */,
  });

  // TODO: remake in custom hook instead of component
  React.useEffect(() => {
    const minutes = progress / 60;
    const isFibNum = fibonacciNumsForTimer.includes(minutes);
    const playbackRate = 4 - minutes / 7; // ? for 21 it will be 1 — original playback rate

    if (isFibNum) {
      playGong({ playbackRate });
    }
  }, [progress, playGong]);

  return null;
};
