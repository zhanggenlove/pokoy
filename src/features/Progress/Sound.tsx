import useSound from "use-sound";
import React from "react";
import gongSfx from "./gong.mp3";
import { fibonacciNumsForTimer } from "shared/constants";

interface Props {
  progress: number;
}

export const Sound: React.FC<Props> = ({ progress }) => {
  const [playGong] = useSound(gongSfx, {
    // NOTE: comfortable volume value
    volume: 0.03,
  });

  // TODO: remake in custom hook instead of component
  React.useEffect(() => {
    const minutes = progress / 60;
    const isFibNum = fibonacciNumsForTimer.includes(minutes);
    // NOTE: for 21 it will be 1 — original playback rate
    const playbackRate = 4 - minutes / 7;

    if (isFibNum) {
      playGong({ playbackRate });
    }
  }, [progress, playGong]);

  return null;
};
