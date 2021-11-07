import React from "react";
import { User } from "@firebase/auth";
import { LOCAL_CACHE_FIELD_NAME, MAX_TIMER_SECONDS } from "shared/constants";
import { firestore } from "features/Home/firebase-init";
import { Minutes } from "features/Minutes";
import { FibonacciProgress } from "features/Progress/ProgressContainer";
import { TimerButton } from "features/TimerButton/TimerButton";
import { Countdown } from "features/Countdown/Countdown";
import {
  sendOrStoreSession,
  LocalPokoySessionData,
  writeSessionFromSeconds,
} from "features/Pokoy/writeSessionToServer";
import styles from "./Pokoy.module.css";
import { doc, getDoc } from "firebase/firestore";

export const Pokoy = ({ user }: { user: User }) => {
  const [startTime, setStartTime] = React.useState(0);
  const [timerDiff, setTimerDiff] = React.useState(0);
  const [isStarted, setStartedFlag] = React.useState(false);
  const [currentTimerId, setCurrentTimerId] = React.useState<
    number | undefined
  >(undefined);

  const finishTimer = React.useCallback(
    (timerDiff: number): void => {
      writeSessionFromSeconds(timerDiff, user, firestore);

      setStartedFlag(false);
      setStartTime(0);

      window.clearTimeout(currentTimerId);
      console.info("Timer resetted");
    },
    [currentTimerId, user]
  );

  React.useEffect((): void => {
    // NOTE: If there was a request error in the end of last session
    const pokoyLastSession = window?.localStorage.getItem(
      LOCAL_CACHE_FIELD_NAME
    );
    if (pokoyLastSession) {
      const lastSession = JSON.parse(pokoyLastSession) as LocalPokoySessionData;
      sendOrStoreSession(lastSession, firestore, user.uid);
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
  }, [currentTimerId, finishTimer, startTime, timerDiff, user.uid]);

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
    <div>
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
        <Total user={user} />
      </p>
    </div>
  );
};

// TODO: extract to components
export const Total = ({ user }: { user: User }) => {
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    getUserStats(user).then((stats) => {
      if (!stats) return;
      setTotal(stats.totalDuration);
    });
  }, [user]);

  return <span style={{ color: "gray", fontSize: "xx-small" }}>{total}</span>;
};

const getUserStats = async (user: User) => {
  const userStatsRef = doc(firestore, "users", user.uid);
  const userStatsDoc = await getDoc(userStatsRef);
  const userStatsData = userStatsDoc.data();
  return userStatsData;
};
