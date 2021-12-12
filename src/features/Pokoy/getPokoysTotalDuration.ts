import { firestore } from "features/app/firebase-init"
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore"
import { DayData } from "shared/types"

// eslint-disable-next-line max-statements
export const getStatsForUser = async () => {
  const userId = "" // NOTE: for manual pasting
  const daysQ = query(
    collection(firestore, "days"),
    where("userId", "==", userId),
    orderBy("timestamp", "asc")
  )

  const querySnapshot = await getDocs(daysQ)

  const daysDocs = querySnapshot.docs
  const total = daysDocs.reduce(
    (acc, doc) => acc + (doc.data() as DayData).totalDuration,
    0
  )

  const count = daysDocs.length
  const firstMeditationDate =
    (daysDocs?.[0]?.data() as DayData)?.timestamp || null

  const statsQ = query(
    collection(firestore, "stats"),
    where("userId", "==", userId),
    limit(1)
  )
  const statsQuerySnapshot = await getDocs(statsQ)

  const userStatsColRef = collection(firestore, "stats")
  const userStatsRef = statsQuerySnapshot.empty
    ? doc(userStatsColRef)
    : statsQuerySnapshot.docs[0].ref
  const newUserStatsData = {
    count,
    userId,
    firstMeditationDate,
    totalDuration: total,
  }

  setDoc(userStatsRef, newUserStatsData)
}
