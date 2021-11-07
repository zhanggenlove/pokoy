import { User } from "@firebase/auth";
import { formatISO } from "date-fns";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { LOCAL_CACHE_FIELD_NAME, SECS_IN_MIN } from "shared/constants";
import { getFibonacciDiscrete } from "shared/utils/getFibonacciDiscrete";

// TODO: extract to types

export interface LocalPokoySessionData {
  timestamp: string;
  sessionTime: string;
}

interface UserData {
  name: string;
  email: string;
  statistics: UserStats;
}

type Timestamp = string;

interface PokoySession {
  duration: number;
  timestamp: Timestamp;
  user: DocumentReference<UserData>;
}

interface UserStats {
  totalDuration: number;
  count: number;
  lastFive: PokoySession[];
}

// TODO: extract to constants
const INIT_USER_STATS: UserStats = {
  totalDuration: 0,
  count: 0,
  lastFive: [],
};

// TODO: solve linter issues
// eslint-disable-next-line complexity, max-statements
export const writeSessionFromSeconds = async (
  seconds: number,
  user: User | null | undefined,
  firestoreDB: Firestore
) => {
  const isSessionLongerThanMinute = seconds > SECS_IN_MIN;
  if (!isSessionLongerThanMinute || !user) {
    return;
  }

  const userRef = doc(firestoreDB, "users", user.uid);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data() as UserData;

  if (!userData) return;

  const timestamp = formatISO(new Date());
  const duration = getFibonacciDiscrete(seconds / SECS_IN_MIN);
  const pokoyData = {
    user: userRef,
    timestamp,
    duration,
  };
  const userStats = userData?.statistics || INIT_USER_STATS;
  const newCount = userStats.count + 1;
  const newDuration = userStats.totalDuration + pokoyData.duration;
  const newUserStats = {
    totalDurations: newDuration || 0,
    count: newCount || 0,
    lastFive: [pokoyData, ...userStats.lastFive.slice(0, 4)],
  };
  await setDoc(userRef, {
    name: user.displayName,
    email: user.email,
    statistics: newUserStats,
  });

  const pokoysColRef = collection(firestoreDB, "pokoys");
  return await addDoc(pokoysColRef, pokoyData);
};

export const sendOrStoreSession = async (
  sessionData: LocalPokoySessionData,
  firestoreDB: Firestore,
  userId: string
) => {
  const userRef = doc(firestoreDB, "users", userId);
  const pokoyData = {
    user: userRef,
    timestamp: sessionData.timestamp,
    duration: sessionData.sessionTime,
  };
  const pokoysColRef = collection(firestoreDB, "pokoys");
  await addDoc(pokoysColRef, pokoyData).catch((e: Error) => {
    console.error(e);
    window?.localStorage.setItem(
      LOCAL_CACHE_FIELD_NAME,
      JSON.stringify(sessionData)
    );
  });
};
