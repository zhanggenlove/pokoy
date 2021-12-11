import React, { useMemo } from "react"
import { AxisOptions, Chart, UserSerie } from "react-charts"

export type PokoyChartData = {
  // NOTE: timestamp
  primary: Date
  // NOTE: meditation duration
  secondary: number
}

interface Props {
  pokoyData: UserSerie<PokoyChartData>[]
}

export const StatsChart: React.FC<Props> = ({ pokoyData }) => {
  const primaryAxis = React.useMemo<AxisOptions<PokoyChartData>>(
    () => ({
      getValue: (datum: PokoyChartData) => datum.primary,
    }),
    []
  )

  const secondaryAxes = React.useMemo<AxisOptions<PokoyChartData>[]>(
    () => [
      {
        min: 0,
        max: 34,
        getValue: (datum: PokoyChartData) => datum.secondary,
      },
    ],
    []
  )

  const isDark = useMemo(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    []
  )

  return (
    <Chart
      options={{
        data: pokoyData,
        primaryAxis,
        secondaryAxes,
        dark: isDark,
      }}
    />
  )
}
