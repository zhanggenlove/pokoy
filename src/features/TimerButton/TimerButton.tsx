import React from "react";
import useSound from "use-sound";
import clickSfx from "./finger-snap.mp3";
import styles from "./TimerButton.module.css";

type Props = {
  isTimerStarted: boolean;
  handleTimerClick: () => void;
};

export const TimerButton: React.FC<Props> = ({
  isTimerStarted = false,
  handleTimerClick,
  children,
}) => {
  const buttonClassNames = `${styles["timer-button"]} ${
    isTimerStarted ? styles["timer-button-started"] : null
  }`;
  const [playClick] = useSound(clickSfx);

  const clickWithSound = React.useCallback(() => {
    playClick();
    handleTimerClick();
  }, [handleTimerClick, playClick]);

  return (
    <button
      onClick={clickWithSound}
      className={buttonClassNames}
      type="button"
      autoFocus
    >
      {children}
    </button>
  );
};
