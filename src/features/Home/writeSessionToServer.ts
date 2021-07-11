import axios from "axios";
import { SERVER_URL } from "shared/constants";
import { getFibonacciDiscrete } from "shared/utils";

export const writeSessionToServer = (seconds: number) => {
  // NOTE: to G.Sheets std date+time format: <dd/mm/yyyy hh:mm:ss>
  const date = new Date().toLocaleString().replace(",", "");

  const totalTime = getFibonacciDiscrete(seconds / 60);
  const sessionData = {
    timestamp: date,
    sessionTime: String(totalTime),
  };

  if (SERVER_URL) {
    axios.post(SERVER_URL, sessionData).then((response) => {
      console.info(response);
    });
  } else {
    console.error(`Server url is not available: ${SERVER_URL}`);
  }
};
