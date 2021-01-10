import React from "react";

interface Props {
  isTimerStarted: boolean;
}

export const Noise: React.FC<Props> = ({ isTimerStarted }) => {
  const audioCtx = React.useMemo(() => {
    const { AudioContext } = window;
    return new AudioContext();
  }, []);

  const generateBrownNoise = React.useCallback((audioCtx) => {
    const bufferSize = 4096;
    const processor = audioCtx.createScriptProcessor(bufferSize, 1, 1);

    processor.onaudioprocess = (e: any) => {
      const output = e.outputBuffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;

        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // (roughly) compensate for gain
      }
    };

    return processor;
  }, []);

  React.useEffect(() => {
    const brownNoise = generateBrownNoise(audioCtx);
    brownNoise.connect(audioCtx.destination);
  }, [audioCtx, generateBrownNoise]);

  React.useEffect(() => {
    if (isTimerStarted) {
      audioCtx.resume();
    } else {
      audioCtx.suspend();
    }
  }, [audioCtx, isTimerStarted]);

  return null;
};
