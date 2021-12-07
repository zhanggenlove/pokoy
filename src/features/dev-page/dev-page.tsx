import { firestore } from "features/app/firebase-init"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { UserSerie } from "react-charts"
import styled from "styled-components/macro"
import { StatsChart, PokoyData } from "../../components/stats-chart.component"

const Wrapper = styled.div`
  width: 100%;
  min-height: 20rem;
  display: flex;
`
export const DevPage = () => {
  const [chartData, setChartData] = useState<UserSerie<PokoyData> | null>(null)

  useEffect(() => {
    const getDays = async (): Promise<void> => {
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
      console.log(chartData)
      setChartData(chartData)
    }
    getDays()
  }, [])

  return (
    chartData && (
      <Wrapper>
        <StatsChart pokoyData={[chartData]} />
      </Wrapper>
    )
  )
}
