import { getColorFromCSSVar } from "shared/components/progress/utils"
import React, { useMemo } from "react"
import { AxisOptions, Chart, UserSerie } from "react-charts"
import { FIB_STYLE_SHEET_COLORS_NAMES } from "shared/constants"
import { PokoyChartData } from "shared/types"
import { Wrapper } from "./stats-chart.styles"

// TODO: extract to types and constants
const totalChartConfig = {
  min: 0,
  max: 34,
  getValue: (datum) => datum.secondary,
  elementType: "area",
} as AxisOptions<PokoyChartData>

const dayMeditationChartConfig = {
  getValue: (datum: PokoyChartData) => datum.secondary,
  id: "2",
} as AxisOptions<PokoyChartData>

interface Props {
  pokoyData: UserSerie<PokoyChartData>[]
}

export const StatsChart: React.FC<Props> = ({ pokoyData }) => {
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

  const isDark = useMemo(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    []
  )

  const defaultColors = useMemo(() => {
    const blueColor = getColorFromCSSVar(FIB_STYLE_SHEET_COLORS_NAMES[4])
    const greenColor = getColorFromCSSVar(FIB_STYLE_SHEET_COLORS_NAMES[3])
    const chartColors = [blueColor, greenColor]

    return chartColors
  }, [])

  return (
    <Wrapper>
      <Chart
        options={{
          defaultColors,
          data: pokoyData,
          primaryAxis,
          secondaryAxes,
          dark: isDark,
        }}
      />
    </Wrapper>
  )
}
