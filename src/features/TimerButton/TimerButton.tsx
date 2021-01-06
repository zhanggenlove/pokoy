import React from "react";

type Props = {
  isTimerStarted: boolean;
  handleTimerClick: () => void;
};

export const TimerButton: React.FC<Props> = ({
  isTimerStarted = false,
  handleTimerClick,
}) => {
  const buttonText = isTimerStarted ? "Закончить" : "Начать";

  return (
    <p>
      <button onClick={handleTimerClick}>{buttonText}</button>
    </p>
  );
};
