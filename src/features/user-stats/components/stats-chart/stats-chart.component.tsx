import { getColorFromCSSVar } from "shared/components/progress/utils"
import React, { useCallback, useMemo } from "react"
import { AxisOptions, Chart, UserSerie } from "react-charts"
import { CSSColorVariables } from "shared/constants"
import { PokoyChartData } from "shared/types"
import { Wrapper } from "./stats-chart.styles"
import { fetchChartData } from "features/user-stats/get-data"
import { User } from "firebase/auth"

// TODO: extract to types and constants
const totalChartConfig: AxisOptions<PokoyChartData> = {
  min: 0,
  max: 34,
  getValue: (datum) => datum.secondary,
  elementType: "area",
}

const dayMeditationChartConfig: AxisOptions<PokoyChartData> = {
  getValue: (datum: PokoyChartData) => datum.secondary,
  id: "2",
}

interface Props {
  pokoyData: UserSerie<PokoyChartData>[]
  user: User
}

export const StatsChart: React.FC<Props> = ({ pokoyData, user }) => {
  const primaryAxis = useMemo<AxisOptions<PokoyChartData>>(
    () => ({
      getValue: (datum: PokoyChartData) => datum.primary,
    }),
    []
  )

  const secondaryAxes = useMemo<AxisOptions<PokoyChartData>[]>(
    () => [totalChartConfig, dayMeditationChartConfig],
    []
  )

  const defaultColors = useMemo<string[]>(() => {
    const { GREEN, EXTRA_GRAY } = CSSColorVariables
    const extraGrayColor = getColorFromCSSVar(EXTRA_GRAY)
    const greenColor = getColorFromCSSVar(GREEN)
    const chartColors = [greenColor, extraGrayColor]

    return chartColors
  }, [])

  const handleChartUpdate = useCallback(() => {
    return fetchChartData(user)
  }, [user])

  const isDark: boolean =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches

  return (
    <Wrapper>
      <Chart
        options={{
          data: pokoyData,
          defaultColors,
          primaryAxis,
          secondaryAxes,
          dark: isDark,
        }}
      />
      <button onClick={handleChartUpdate} type="button">
        ↻
      </button>
    </Wrapper>
  )
}
