import { User } from "@firebase/auth";
import { useNoSleep } from "use-no-sleep";
import { LOCAL_CACHE_FIELD_NAME, MAX_TIMER_SECONDS } from "shared/constants";
import { firestore } from "features/Home/firebase-init";
import { Minutes } from "features/Minutes";
import { useState, useEffect, useCallback } from "react";
import { TimerButton } from "features/TimerButton/TimerButton";
import { Countdown } from "features/Countdown/Countdown";
import {
  sendSessionFromLocalStore,
  sendSessionFromSeconds,
} from "features/Pokoy/writeSessionToServer";
import { Tip } from "features/Tip";
import styles from "./Pokoy.module.css";
import { PokoySession } from "shared/types";
import { SignOut } from "features/SignIn/SignOut";
import { FibonacciProgress } from "features";

// TODO: refactor component
export const Pokoy = ({ user }: { user: User }) => {
  const [currentTimerId, setCurrentTimerId] = useState<number | null>(null);
  const [timerDiff, setTimerDiff] = useState<number>(0);
  const [isStarted, setStartedFlag] = useState(false);
  const [requestStatus, setRequestStatus] = useState<
    "REQUEST" | "SUCCESS" | "FAILURE" | "NONE"
  >("NONE");
  useNoSleep(true);

  const finishTimer = useCallback(
    async (timerDiff: number): Promise<void> => {
      const isCurrentTimerIdExist = currentTimerId !== null;
      if (!isCurrentTimerIdExist) throw Error("currentTimerId is not exist");

      window.clearInterval(currentTimerId);
      setStartedFlag(false);
      setTimerDiff(0);

      try {
        setRequestStatus("REQUEST");
        // NOTE: for developing
        await sendSessionFromSeconds(firestore, user, 61);
        // await sendSessionFromSeconds(firestore, user, timerDiff);
        setRequestStatus("SUCCESS");
      } catch (e) {
        setRequestStatus("FAILURE");
        console.error(e);
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

      sendSessionFromLocalStore(firestore, user, lastSession);
      window?.localStorage.removeItem(LOCAL_CACHE_FIELD_NAME);
    }
  }, [user]);

  return (
    <div className={styles["pokoy-wrapper"]}>
      <p className={styles["top-text-wrapper"]}>
        <Countdown seconds={timerDiff} />
      </p>

      <TimerButton
        handleTimerClick={handleClick}
        isTimerStarted={isStarted}
        requestStatus={requestStatus}
      >
        <FibonacciProgress value={timerDiff} />
      </TimerButton>

      {/* // TODO: extract to component */}
      <p className={styles["bottom-text-wrapper"]}>
        {isStarted ? <Minutes seconds={timerDiff} /> : <Tip />}
      </p>

      <SignOut />
    </div>
  );
};
