import { PokoyData } from "components/stats-chart.component"
import { firestore } from "features/app/firebase-init"
import { User } from "firebase/auth"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { UserStatsData } from "./user-stats"

export const getDays = async (
  setData: (data: { data: PokoyData[] }) => void,
  user: User
): Promise<void> => {
  const daysColRef = collection(firestore, "days")
  const daysQuery = query(
    daysColRef,
    where("userId", "==", user.uid),
    orderBy("timestamp", "desc")
  )
  const daysColSnapshot = await getDocs(daysQuery)
  const mappedDocs: PokoyData[] = daysColSnapshot.docs
    .map((snap) => snap.data())
    .filter((d) => d?.totalDuration)
    .map((d) => ({
      primary: d.timestamp.toDate() as Date,
      secondary: d.totalDuration as number,
    }))
  const chartData = { data: mappedDocs }
  setData(chartData)
}

// eslint-disable-next-line max-statements
export const getStats = async (
  setData: (data: UserStatsData) => void,
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
  setData({ ...statsData, average: statsData.totalDuration / statsData.count })
}
