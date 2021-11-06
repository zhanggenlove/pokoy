import { User } from "@firebase/auth";
import { doc, Firestore, setDoc } from "firebase/firestore";
import {
  LOCAL_CACHE_FIELD_NAME,
  SECS_IN_MIN,
  SERVER_URL,
} from "shared/constants";
import { getFibonacciDiscrete } from "shared/utils/getFibonacciDiscrete";
import { v4 as uuidV4 } from "uuid";

export interface SessionData {
  timestamp: string;
  sessionTime: string;
}

// TODO: solve linter issues
// eslint-disable-next-line complexity, max-statements
export const writeSessionFromSeconds = async (
  seconds: number,
  user: User | null | undefined,
  firestoreDB: Firestore
) => {
  const timestamp = new Date().toISOString();
  const duration = getFibonacciDiscrete(seconds / SECS_IN_MIN);

  if (seconds > SECS_IN_MIN && SERVER_URL) {
    const pokoyId = uuidV4();
    const pokoyDoc = doc(firestoreDB, "pokoys", pokoyId);

    if (user) {
      const userDoc = user && doc(firestoreDB, "users", user.uid);
      await setDoc(userDoc, {
        name: user.displayName,
        email: user.email,
      });
    }

    await setDoc(pokoyDoc, {
      user: user ? `/users/${user?.uid}` : null,
      timestamp,
      duration,
      seconds,
    });
  }
};

export const sendOrWriteSession = async (
  sessionData: SessionData,
  firestoreDB: Firestore,
  userId: string
) => {
  const pokoyId = uuidV4();
  const pokoyDoc = doc(firestoreDB, "pokoys", pokoyId);

  await setDoc(pokoyDoc, {
    user: `/users/${userId}`,
    timestamp: sessionData.timestamp,
    duration: sessionData.sessionTime,
  }).catch((e: Error) => {
    console.error(e);
    window?.localStorage.setItem(
      LOCAL_CACHE_FIELD_NAME,
      JSON.stringify(sessionData)
    );
  });
};
