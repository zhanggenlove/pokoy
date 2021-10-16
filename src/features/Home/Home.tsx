import React from "react";
import { FibonacciProgress, TimerButton, Countdown, Minutes } from "features";
import {
  SessionData,
  sendSession,
  writeSessionFromSeconds,
} from "./writeSessionToServer";
import styles from "./Home.module.css";
import { LOCAL_CACHE_FIELD_NAME } from "shared/constants";

const MAX_TIMER_SECONDS = 1260; // NOTE: equal to 21 minutes

// TODO: refactor this component
export const Home: React.FC = () => {
  const [startTime, setStartTime] = React.useState(0);
  const [timerDiff, setTimerDiff] = React.useState(0);
  const [isStarted, setStartedFlag] = React.useState(false);
  const [currentTimerId, setCurrentTimerId] = React.useState<
    number | undefined
  >(undefined);

  const finishTimer = React.useCallback(
    (timerDiff: number): void => {
      writeSessionFromSeconds(timerDiff); // NOTE: side effect for write session data to google sheet

      setStartedFlag(false);
      setStartTime(0);

      window.clearTimeout(currentTimerId);
      console.info("Timer resetted");
    },
    [currentTimerId]
  );

  React.useEffect((): void => {
    // NOTE: If there was a request error in the end of last session
    const pokoyLastSession = window?.localStorage.getItem(
      LOCAL_CACHE_FIELD_NAME
    );
    if (pokoyLastSession) {
      const lastSession = JSON.parse(pokoyLastSession) as SessionData;
      sendSession(lastSession);
      window?.localStorage.removeItem(LOCAL_CACHE_FIELD_NAME);
    }

    // NOTE: if timer is not started
    if (startTime !== 0) {
      const secondsNow = Math.round(Date.now() / 1000);
      const diff = secondsNow - startTime;
      setTimerDiff(diff);
    }

    // NOTE: if timer is over max session time
    if (timerDiff === MAX_TIMER_SECONDS) {
      finishTimer(timerDiff);
    }
  }, [currentTimerId, finishTimer, startTime, timerDiff]);

  // FIXME: what is this function do?
  const tickTimer = React.useCallback(() => {
    window.clearTimeout(currentTimerId);

    const newTimerId = window.setTimeout(() => {
      tickTimer();
    }, 100);
    setCurrentTimerId(newTimerId);
  }, [currentTimerId]);

  const handleTimerClick = React.useCallback(() => {
    setTimerDiff(0);

    if (isStarted) {
      return finishTimer(timerDiff);
    }

    setStartedFlag(true);

    const startInSeconds = Math.round(Date.now() / 1000);
    setStartTime(startInSeconds);
    tickTimer();
  }, [finishTimer, isStarted, tickTimer, timerDiff]);

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
