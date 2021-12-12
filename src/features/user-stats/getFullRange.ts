import { Timestamp } from "firebase/firestore"
import { DayData } from "shared/types"

// TODO: extract to constants
const MILLIS_IN_DAY = 1000 * 3600 * 24

// NOTE: return every array of every day with meditation stats from first meditation date
export const getFullRange = (daysWithMeditations: DayData[]) => {
  const daysWithMeditationsAndEmptyDays = daysWithMeditations
    .reverse()
    .reduce(fillRangeWithMissedDays, [] as DayData[])
    .reverse()

  return daysWithMeditationsAndEmptyDays
}

function fillRangeWithMissedDays(
  acc: DayData[],
  day: DayData,
  i: number,
  arr: DayData[]
): DayData[] {
  if (i === 0) return [...acc, day]

  const prevMeditationDate = arr[i - 1].timestamp
  const expectedDate = Timestamp.fromMillis(
    prevMeditationDate.toMillis() + MILLIS_IN_DAY
  )
  const isCurrentDateEqualToExpected = day.timestamp.isEqual(expectedDate)

  return !isCurrentDateEqualToExpected
    ? countAndPushMissedDays(acc, day, expectedDate)
    : [...acc, day]
}

function getNextDay(date: Timestamp) {
  return Timestamp.fromMillis(date.toMillis() + MILLIS_IN_DAY)
}

function countAndPushMissedDays(
  acc: DayData[],
  day: DayData,
  expectedDate: Timestamp
) {
  const dateDiffInDays =
    (day.timestamp.toMillis() - expectedDate.toMillis()) / MILLIS_IN_DAY

  const missedDays = Array(dateDiffInDays)
    .fill(null)
    .map((_, i) => {
      const newTimestamp = i > 0 ? getNextDay(expectedDate) : expectedDate
      const emptyDay: DayData = {
        ...day,
        meditations: [],
        totalDuration: 0,
        timestamp: newTimestamp,
      }
      return emptyDay
    })
  const newAcc = acc.concat(missedDays, day)

  return newAcc
}
