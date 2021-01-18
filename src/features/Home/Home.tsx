import React from "react";
import {
  FibonacciProgress,
  Header,
  TimerButton,
  Countdown,
  Noise,
} from "features";
import styles from "./Home.module.css";

const Home: React.FC = () => {
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
      setStartedFlag(false);
      setTimestamp(0);

      window.clearTimeout(currentTimerId);
      console.log("Timer resetted");

      return;
    }

    setStartedFlag(true);

    setTimestamp(Math.round(Date.now() / 1000));
    tickTimer();
  }, [currentTimerId, isStarted, tickTimer]);

  return (
    <main className={styles["app-wrapper"]}>
      <Header />
      <TimerButton
        handleTimerClick={handleTimerClick}
        isTimerStarted={isStarted}
      />
      <FibonacciProgress value={timerDiff} />
      <Noise isTimerStarted={isStarted} />
      <Countdown seconds={timerDiff} />
    </main>
  );
};

export default Home;
