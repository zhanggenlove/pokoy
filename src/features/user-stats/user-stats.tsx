import { useCallback, useEffect, useState } from "react"
import { User } from "@firebase/auth"
import { UserSerie } from "react-charts"
import { PokoyChartData, UserStatsData } from "shared/types"
import { fetchChartData, getStats } from "./get-data"
import { StatsChart } from "./components/stats-chart/stats-chart.component"
import { StatsNumbers } from "./components/stats-numbers/stats-numbers.component"
import { Wrapper } from "./user-stats.styles"

interface Props {
  user: User
}

export const UserStats: React.FC<Props> = ({ user }) => {
  const [chartData, setChartData] = useState<UserSerie<PokoyChartData>[]>([])
  const [statsData, setStatsData] = useState<UserStatsData | null>(null)

  const memoizedGetChartData = useCallback(fetchChartData, [])
  const memoizedGetStats = useCallback(getStats, [])

  useEffect(() => {
    memoizedGetChartData(user).then((chartData) => {
      setChartData(chartData)
    })
    memoizedGetStats(setStatsData, user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataLength = chartData?.[0]?.data?.length
  const statsExist = dataLength && dataLength > 1

  return (
    <Wrapper>
      {statsExist ? (
        <>
          <StatsNumbers statsData={statsData} />
          <StatsChart pokoyData={chartData} user={user} />
        </>
      ) : (
        <span>
          There are no statistics yet. Try meditating more than twice.
        </span>
      )}
    </Wrapper>
  )
}
