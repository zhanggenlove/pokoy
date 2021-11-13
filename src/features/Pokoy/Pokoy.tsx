import { User } from "@firebase/auth";
import { useNoSleep } from "use-no-sleep";
import { LOCAL_CACHE_FIELD_NAME, MAX_TIMER_SECONDS } from "shared/constants";
import { firestore } from "features/Home/firebase-init";
import { Minutes } from "features/Minutes";
import { useState, useEffect, useCallback } from "react";
import { FibonacciProgress } from "features/Progress/ProgressContainer";
import { TimerButton } from "features/TimerButton/TimerButton";
import { Countdown } from "features/Countdown/Countdown";
import {
  sendSessionFromLocalStore as writeSessionFromLocalStorage,
  sendSessionFromSeconds,
} from "features/Pokoy/writeSessionToServer";
import { Total } from "./Total";
import { PokoySession } from "./types";
import styles from "./Pokoy.module.css";

export const Pokoy = ({ user }: { user: User }) => {
  useNoSleep(true);
  const [currentTimerId, setCurrentTimerId] = useState<number | null>(null);
  const [timerDiff, setTimerDiff] = useState<number>(0);
  const [isStarted, setStartedFlag] = useState(false);

  const finishTimer = useCallback(
    async (timerDiff: number): Promise<void> => {
      await sendSessionFromSeconds(firestore, user, timerDiff);

      setStartedFlag(false);
      setTimerDiff(0);
      const isCurrentTimerIdExist = currentTimerId !== null;
      if (isCurrentTimerIdExist) {
        window.clearInterval(currentTimerId);
        console.info("Timer resetted");
      }
    },
    [currentTimerId, user]
  );

  const handleTimer = useCallback(
    (startTime: number) => {
      const secondsNow = Math.round(Date.now() / 1000);
      const secondsDiff = secondsNow - startTime;
      setTimerDiff(secondsDiff);

      const isTimerDiffMoreThanMinute = timerDiff === MAX_TIMER_SECONDS;
      if (isTimerDiffMoreThanMinute) {
        finishTimer(timerDiff);
      }
    },
    [finishTimer, timerDiff]
  );

  const startTimer = useCallback(() => {
    const startInSeconds = Math.round(Date.now() / 1000);
    setStartedFlag(true);

    const newTimerId = window.setInterval(
      () => handleTimer(startInSeconds),
      100
    );
    setCurrentTimerId(newTimerId);
  }, [handleTimer]);

  const handleClick = useCallback(() => {
    setTimerDiff(0);

    if (isStarted) {
      return finishTimer(timerDiff);
    } else {
      return startTimer();
    }
  }, [finishTimer, isStarted, startTimer, timerDiff]);

  // TODO: extract function in useEffect from component
  useEffect(() => {
    const storedAfterFailurePokoySession = window?.localStorage.getItem(
      LOCAL_CACHE_FIELD_NAME
    );

    if (storedAfterFailurePokoySession) {
      const lastSession = JSON.parse(
        storedAfterFailurePokoySession
      ) as PokoySession;

      writeSessionFromLocalStorage(firestore, user, lastSession);
      window?.localStorage.removeItem(LOCAL_CACHE_FIELD_NAME);
    }
  }, [user]);

  return (
    <div className={styles["pokoy-wrapper"]}>
      <p>
        <Countdown seconds={timerDiff} />
      </p>

      <TimerButton handleTimerClick={handleClick} isTimerStarted={isStarted}>
        <FibonacciProgress value={timerDiff} />
      </TimerButton>

      <p>
        <Minutes seconds={timerDiff} />
        <Total user={user} />
      </p>
    </div>
  );
};
