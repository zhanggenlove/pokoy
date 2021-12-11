import { PokoyChartData } from "components/stats-chart.component"
import { firestore } from "features/app/firebase-init"
import { User } from "firebase/auth"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { DayData } from "shared/types"
import { getFullRange } from "./getFullRange"
import { UserStatsData } from "./user-stats"

// eslint-disable-next-line max-statements
export const getDays = async (
  setDataToComponentState: (data: { data: PokoyChartData[] }) => void,
  user: User
): Promise<void> => {
  const daysColRef = collection(firestore, "days")
  const daysQuery = query(
    daysColRef,
    where("userId", "==", user.uid),
    orderBy("timestamp", "desc")
  )
  const daysColSnapshot = await getDocs(daysQuery)
  const daysWithMeditations = daysColSnapshot.docs.map(
    (snap) => snap.data() as DayData
  )

  const fullRange = getFullRange(daysWithMeditations)
  const daysWithMeditationsAsAxis: PokoyChartData[] = fullRange.map((d) => ({
    primary: d.timestamp.toDate() as Date,
    secondary: d.totalDuration as number,
  }))
  const chartData = { data: daysWithMeditationsAsAxis }
  setDataToComponentState(chartData)
}

// eslint-disable-next-line max-statements
export const getStats = async (
  setDataToComponentState: (data: UserStatsData) => void,
  user: User
): Promise<void> => {
  const statsColRef = collection(firestore, "stats")
  const statsQuery = query(statsColRef, where("userId", "==", user.uid))
  const daysColSnapshot = await getDocs(statsQuery)

  const statsData = daysColSnapshot?.docs[0]?.data() as UserStatsData

  if (!statsData) {
    console.error("there are no user statistics yet")
    return
  }

  setDataToComponentState(statsData)
}

export const getTotalInHours = (minutes: number): number => {
  const MINS_IN_HOUR = 60
  return roundToSecondDecimalPlace(minutes / MINS_IN_HOUR)
}

// eslint-disable-next-line max-statements
export const getAverage = (statsData: UserStatsData) => {
  if (!statsData || !statsData.firstMeditationDate) {
    return null
  }

  const SECS_IN_DAY = 1000 * 3600 * 24
  const { firstMeditationDate } = statsData
  const statsMillisecondsDiff =
    Date.now() - firstMeditationDate.toDate().getTime()
  const statsRangeInDays = roundToSecondDecimalPlace(
    statsMillisecondsDiff / SECS_IN_DAY
  )

  const average = roundToSecondDecimalPlace(
    statsData.totalDuration / statsRangeInDays
  )

  return average
}

function roundToSecondDecimalPlace(average: number): number {
  // TODO: decide which rounding aproach to use for better average calculation
  return Math.round(average * 10) / 10
}
