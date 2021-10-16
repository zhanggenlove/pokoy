import axios from "axios";
import {
  LOCAL_CACHE_FIELD_NAME,
  SECS_IN_MIN,
  SERVER_URL,
} from "shared/constants";
import { getFibonacciDiscrete } from "shared/utils";

export interface SessionData {
  timestamp: string;
  sessionTime: string;
}

export const writeSessionFromSeconds = (seconds: number) => {
  // NOTE: to G.Sheets std date+time format: <dd/mm/yyyy hh:mm:ss>
  const date = getTimestamp();
  const sessionData = getSessionData(seconds, date);

  if (seconds > SECS_IN_MIN && SERVER_URL) {
    sendSession(sessionData);
  }
};

const getSessionData = (seconds: number, timestamp: string) => {
  const totalTime = getFibonacciDiscrete(seconds / SECS_IN_MIN);
  const sessionData: SessionData = {
    timestamp,
    sessionTime: String(totalTime),
  };
  return sessionData;
};

export const sendSession = (sessionData: SessionData) =>
  axios
    .post(SERVER_URL as string, sessionData)
    .then((response) => {
      console.log(response);
    })
    .catch((e: Error) => {
      console.error(e);
      window?.localStorage.setItem(
        LOCAL_CACHE_FIELD_NAME,
        JSON.stringify(sessionData)
      );
    });

const getTimestamp = () => {
  const dateObj = new Date();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const date = `${day}/${month}/${year}`;

  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes() + 1).padStart(2, "0");
  const secs = String(dateObj.getSeconds() + 1).padStart(2, "0");
  const time = `${hours}:${minutes}:${secs}`;

  const dateAndTime = `${date} ${time}`;
  return dateAndTime;
};
