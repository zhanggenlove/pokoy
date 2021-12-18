import { User } from "@firebase/auth"
import { PokoyChartData, StatsChart } from "components/stats-chart.component"
import { Timestamp } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { UserSerie } from "react-charts"
import {
  getAverage,
  fetchAndsetChartData,
  getStats,
  getTotalInHours,
} from "./getData"
import { StyledSpan, ChartWrapper, StatsWrapper } from "./user-stats.styles"

export interface UserStatsData {
  // TODO: remove nullable values from this field
  firstMeditationDate: Timestamp | null
  totalDuration: number
  count: number
  userId: string
}

interface Props {
  user: User
}

export const UserStats: React.FC<Props> = ({ user }) => {
  const [chartData, setChartData] = useState<UserSerie<PokoyChartData>[]>([])
  const [statsData, setStatsData] = useState<UserStatsData | null>(null)

  const memoizedGetDays = useCallback(fetchAndsetChartData, [])
  const memoizedGetStats = useCallback(getStats, [])

  useEffect(() => {
    memoizedGetDays(setChartData, user)
    memoizedGetStats(setStatsData, user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataLength = chartData?.[0]?.data?.length
  const statsExist = dataLength && dataLength > 1
  const totalDurationExists = !!statsData?.totalDuration

  return statsExist ? (
    <StatsWrapper>
      {/* // TODO: extract to component */}
      {totalDurationExists && (
        <>
          <StyledSpan>
            Total: {getTotalInHours(statsData.totalDuration)} hours
          </StyledSpan>
          <StyledSpan>Average: {getAverage(statsData)} minutes</StyledSpan>
        </>
      )}

      <ChartWrapper>
        <StatsChart pokoyData={chartData} />
      </ChartWrapper>
    </StatsWrapper>
  ) : (
    <StyledSpan>
      There are no statistics yet. Try meditating more than twice.
    </StyledSpan>
  )
}
