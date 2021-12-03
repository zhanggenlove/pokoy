import React from "react"
import { AxisOptions, Chart, UserSerie } from "react-charts"

export type PokoyData = {
  primary: Date
  secondary: number
}

interface Props {
  pokoyData: UserSerie<PokoyData>[]
}

export const StatsChart: React.FC<Props> = ({ pokoyData }) => {
  const primaryAxis = React.useMemo<
    AxisOptions<typeof pokoyData[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as Date,
    }),
    []
  )

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof pokoyData[number]["data"][number]>[]
  >(
    () => [
      {
        min: 0,
        max: 100,
        getValue: (datum) => datum.secondary as number,
      },
    ],
    []
  )

  const isDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches

  return (
    <>
      <Chart
        options={{
          data: pokoyData,
          primaryAxis,
          secondaryAxes,
          padding: 32,
          dark: isDark,
        }}
      />
    </>
  )
}
