import { getAverage, getTotalInHours } from "features/user-stats/get-data"
import { UserStatsData } from "shared/types"
import { StyledSpan } from "./stats-numbers.styles"

interface Props {
  statsData: UserStatsData | null
}
export const StatsNumbers: React.FC<Props> = ({ statsData }) => {
  const totalDurationExists = !!statsData?.totalDuration

  return totalDurationExists ? (
    <>
      <StyledSpan>
        Total: {getTotalInHours(statsData.totalDuration)} hours
      </StyledSpan>
      <StyledSpan>Average: {getAverage(statsData)} minutes</StyledSpan>
    </>
  ) : null
}
