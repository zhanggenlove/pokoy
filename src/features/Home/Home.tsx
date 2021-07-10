import React from "react";
import { FibonacciProgress, TimerButton, Countdown, Minutes } from "features";
import { writeSessionToServer } from "./writeSessionToServer";
import styles from "./Home.module.css";

// TODO: refactor this component
export const Home: React.FC = () => {
  const [timestamp, setTimestamp] = React.useState(0);
  const [timerDiff, setTimerDiff] = React.useState(0);
  const [isStarted, setStartedFlag] = React.useState(false);
  const [currentTimerId, setCurrentTimerId] = React.useState<
    number | undefined
  >(undefined);

  React.useEffect(() => {
    if (timestamp !== 0) {
      const timeDiff = Math.round(Date.now() / 1000 - timestamp);
      setTimerDiff(timeDiff);
    }

    return () => {
      clearTimeout(currentTimerId);
    };
  }, [currentTimerId, timestamp]);

  const tickTimer = React.useCallback(() => {
    const timerId = window.setTimeout(() => {
      tickTimer();
    }, 100);

    setCurrentTimerId(timerId);
  }, []);

  const handleTimerClick = React.useCallback(() => {
    setTimerDiff(0);

    if (isStarted) {
      writeSessionToServer(timerDiff); // NOTE: side effect for write session data to google sheet

      setStartedFlag(false);
      setTimestamp(0);

      window.clearTimeout(currentTimerId);
      console.log("Timer resetted");

      return;
    }

    setStartedFlag(true);

    setTimestamp(Math.round(Date.now() / 1000));
    tickTimer();
  }, [currentTimerId, isStarted, tickTimer, timerDiff]);

  return (
    <main className={styles["app-wrapper"]}>
      <p>
        <Countdown seconds={timerDiff} />
      </p>
      <div className={styles["progress-spiral-wrapper"]}>
        <TimerButton
          handleTimerClick={handleTimerClick}
          isTimerStarted={isStarted}
        >
          <FibonacciProgress value={timerDiff} />
        </TimerButton>
      </div>
      <p>
        <Minutes seconds={timerDiff} />
      </p>
    </main>
  );
};
