import { User } from "@firebase/auth";
import { formatISO } from "date-fns";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
} from "firebase/firestore";
import { LOCAL_CACHE_FIELD_NAME, SECS_IN_MIN } from "shared/constants";
import { getFibonacciDiscrete } from "shared/utils/getFibonacciDiscrete";
import { PokoySession, UserData } from "./types";

// TODO: extract to constants
// const INIT_USER_STATS: UserStats = {
//   totalDuration: 0,
//   count: 0,
//   lastFive: [],
// };

// TODO: solve linter issues
// eslint-disable-next-line max-statements
export const sendSessionFromSeconds = async (
  firestoreDB: Firestore,
  user: User | null | undefined,
  seconds: number
): Promise<DocumentReference<DocumentData> | void> => {
  const isSessionLongerThanMinute = seconds > SECS_IN_MIN;
  if (!isSessionLongerThanMinute || !user) {
    return;
  }

  const userRef = doc(
    firestoreDB,
    "users",
    user.uid
  ) as DocumentReference<UserData>;
  // const userDoc = await getDoc(userRef);
  // const userData = userDoc.data() as UserData;

  // if (!userData) return;

  const timestamp = formatISO(new Date());
  const duration = getFibonacciDiscrete(seconds / SECS_IN_MIN);
  const pokoyData = {
    user: userRef,
    timestamp,
    duration,
  };

  return await sendPokoySessionToServer(firestoreDB, pokoyData);
};

// TODO: add working with several session not just last
export const sendSessionFromLocalStore = async (
  firestoreDB: Firestore,
  user: User | null | undefined,
  LocalPokoyData: PokoySession
): Promise<DocumentReference<DocumentData> | void> => {
  const isSessionLongerThanMinute =
    Number(LocalPokoyData.duration) > SECS_IN_MIN;
  if (!isSessionLongerThanMinute || !user) {
    return;
  }

  return await sendPokoySessionToServer(firestoreDB, LocalPokoyData);
};

const sendPokoySessionToServer = async (
  firestoreDB: Firestore,
  pokoyData: PokoySession
): Promise<DocumentReference<DocumentData> | void> => {
  const pokoysColRef = collection(firestoreDB, "pokoys");
  try {
    return await addDoc(pokoysColRef, pokoyData);
  } catch (e: unknown) {
    console.error(e);
    window?.localStorage.setItem(
      LOCAL_CACHE_FIELD_NAME,
      JSON.stringify(pokoyData)
    );
  }
};
