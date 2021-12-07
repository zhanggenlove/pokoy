import { User } from "@firebase/auth"
import { PokoyData, StatsChart } from "components/stats-chart.component"
import { useCallback, useEffect, useState } from "react"
import { UserSerie } from "react-charts"
import { getDays, getStats } from "./getData"
import { StyledSpan, Wrapper } from "./user-stats.styles"

export interface UserStatsData {
  totalDuration: number
  count: number
  userId: string
  average: number
}

interface Props {
  user: User
}

export const UserStats: React.FC<Props> = ({ user }) => {
  const [chartData, setChartData] = useState<UserSerie<PokoyData> | null>(null)
  const [statsData, setStatsData] = useState<UserStatsData | null>(null)

  useCallback(getDays, [])
  useCallback(getStats, [])

  useEffect(() => {
    getDays(setChartData, user)
    getStats(setStatsData, user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const statsExist = chartData?.data?.length && chartData?.data?.length > 1

  return statsExist ? (
    <>
      <Wrapper>
        <StatsChart pokoyData={[chartData]} />
      </Wrapper>
      <StyledSpan>Total: {statsData?.totalDuration}</StyledSpan>
      <StyledSpan>Count: {statsData?.count}</StyledSpan>
    </>
  ) : (
    <StyledSpan>
      There are no statistics yet. Try meditating more than twice.
    </StyledSpan>
  )
}
