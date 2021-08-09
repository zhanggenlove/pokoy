import axios from "axios";
import { SERVER_URL } from "shared/constants";
import { getFibonacciDiscrete } from "shared/utils";

export const writeSessionToServer = (seconds: number) => {
  // NOTE: to G.Sheets std date+time format: <dd/mm/yyyy hh:mm:ss>
  const dateObj = new Date();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes() + 1).padStart(2, "0");
  const secs = String(dateObj.getSeconds() + 1).padStart(2, "0");
  const date = `${day}/${month}/${year} ${hours}:${minutes}:${secs}`;

  const totalTime = getFibonacciDiscrete(seconds / 60);
  const sessionData = {
    timestamp: date,
    sessionTime: String(totalTime),
  };

  if (totalTime > 0 && SERVER_URL) {
    axios.post(SERVER_URL, sessionData).then((response) => {
      console.info(response);
    });
  }
};
