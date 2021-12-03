import { PokoyData, StatsChart } from "components/stats-chart.component"
import { firestore } from "features/app/firebase-init"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { UserSerie } from "react-charts"
import { Wrapper } from "./user-stats.styles"

// TODO: extract function
const getDays = async (
  setData: (data: { data: PokoyData[] }) => void
): Promise<void> => {
  const daysColRef = collection(firestore, "days")
  const daysQuery = query(
    daysColRef,
    where("userId", "==", "rnuYUc9vigMVMkYqs70cSDBTgSm2"),
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

export const UserStats = () => {
  const [chartData, setChartData] = useState<UserSerie<PokoyData> | null>(null)

  useEffect(() => {
    getDays(setChartData)
    console.log(chartData)
  }, [chartData])

  return (
    chartData && (
      <Wrapper>
        <StatsChart pokoyData={[chartData]} />
      </Wrapper>
    )
  )
}
