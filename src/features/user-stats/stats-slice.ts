import { createSlice } from "@reduxjs/toolkit"
import { StatsData, UserStatsData } from "shared/types"

interface StatsState extends UserStatsData {
  isLoading: boolean
  error: any
}

const statsInitialState: StatsState = {
  firstMeditationDate: null,
  count: 0,
  totalDuration: 0,
  userId: "",
  isLoading: false,
  error: null,
}

export const statsSlice = createSlice({
  name: "stats",
  initialState: statsInitialState,
  reducers: {},
})

export const statsReducer = statsSlice.reducer
