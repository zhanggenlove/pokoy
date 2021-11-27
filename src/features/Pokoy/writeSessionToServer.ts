import { User } from "@firebase/auth"
import { formatISO } from "date-fns"
import { firestore } from "features/app/firebase-init"
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore"
import {
  INIT_DAY_DATA,
  LOCAL_CACHE_FIELD_NAME,
  SECS_IN_MIN,
} from "shared/constants"
import { DayData, PokoySession } from "shared/types"
import { getFibonacciDiscrete } from "shared/utils/getFibonacciDiscrete"

// TODO: solve linter issues
// eslint-disable-next-line max-statements
export const sendSessionFromSeconds = async (
  firestoreDB: Firestore,
  user: User | null | undefined,
  seconds: number
): Promise<DocumentReference<DocumentData> | void> => {
  if (!user) {
    console.error("User is not defined. Request not sended.", "user: ", user)
    return
  }

  const timestamp = formatISO(new Date())
  const duration = getFibonacciDiscrete(seconds / SECS_IN_MIN)
  const pokoyData: PokoySession = {
    userId: user.uid,
    timestamp,
    duration,
  }

  return await sendPokoySessionToServer(firestoreDB, pokoyData)
}

// TODO: add working with several session not just last
export const sendSessionFromLocalStore = async (
  firestoreDB: Firestore,
  user: User | null | undefined,
  LocalPokoyData: PokoySession
): Promise<DocumentReference<DocumentData> | void> => {
  const isSessionLongerThanMinute =
    Number(LocalPokoyData.duration) > SECS_IN_MIN
  if (!isSessionLongerThanMinute || !user) {
    return
  }

  return await sendPokoySessionToServer(firestoreDB, LocalPokoyData)
}

/* eslint-disable-next-line max-statements */
const sendPokoySessionToServer = async (
  firestoreDB: Firestore,
  pokoyData: PokoySession
): Promise<DocumentReference<DocumentData> | void> => {
  const userId = pokoyData.userId
  const daysColRef = collection(firestoreDB, "days")
  const dayDateString = new Date(pokoyData.timestamp).toDateString()
  const dayTimestamp = Timestamp.fromDate(new Date(dayDateString))
  const daysQuery = query(
    daysColRef,
    where("userId", "==", userId),
    where("timestamp", "==", dayTimestamp)
  )
  const daysQuerySnapshot = await getDocs(daysQuery)

  if (!daysQuerySnapshot.empty) {
    await updateExistingDay(daysQuerySnapshot, pokoyData)
  } else if (daysQuerySnapshot.empty) {
    await createNewDay(daysColRef, dayTimestamp, pokoyData, userId)
  }
}

/* eslint-disable-next-line max-statements */
const createNewDay = async (
  daysColRef: CollectionReference<DocumentData>,
  dayTimestamp: Timestamp,
  pokoyData: PokoySession,
  userId: string
) => {
  console.log("write day to NEW document")
  const newDayRef = doc(daysColRef)
  const dayData = INIT_DAY_DATA

  const statsQuery = query(
    collection(firestore, "stats"),
    where("userId", "==", userId),
    limit(1)
  )
  const userStatsQuerySnapshot = await getDocs(statsQuery)

  if (userStatsQuerySnapshot.empty) {
    console.error("User stats not found")
    console.log("🚀 ~ userStatsQuerySnapshot.docs", userStatsQuerySnapshot.docs)
    return
  }
  const userStatsRef = userStatsQuerySnapshot.docs[0].ref

  const newDayData: DayData = {
    timestamp: dayTimestamp,
    count: dayData.count + 1,
    totalDuration: dayData.totalDuration + pokoyData.duration,
    meditations: [...dayData.meditations, pokoyData],
    statsRef: userStatsRef,
    userId,
  }

  await setDay(newDayRef, newDayData)
}

/* eslint-disable-next-line max-statements */
const updateExistingDay = async (
  daysQuerySnapshot: QuerySnapshot<DocumentData>,
  pokoyData: PokoySession
) => {
  console.log("write day to EXISTED document")
  // TODO: replace hardcode by dynamic code
  const dayDocRef = daysQuerySnapshot.docs[0].ref
  const daySnapshot = await getDoc(dayDocRef)
  const dayData = daySnapshot.data() as DayData

  const totalDuration = dayData?.totalDuration ?? 0
  const meditations = dayData?.meditations ?? []

  const newDayData: DayData = {
    ...dayData,
    count: dayData?.count + 1,
    totalDuration: totalDuration + pokoyData.duration,
    meditations: [...meditations, pokoyData],
  }

  await setDay(dayDocRef, newDayData)
}

const setDay = async (
  dayRef: DocumentReference<DocumentData>,
  newDayData: any
) => {
  try {
    await setDoc(dayRef, newDayData)
    console.log("success")
  } catch (e) {
    console.log("⛔️", e)
    window?.localStorage.setItem(
      LOCAL_CACHE_FIELD_NAME,
      JSON.stringify(newDayData)
    )
  }
}
