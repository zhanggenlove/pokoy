import { createSlice } from "@reduxjs/toolkit"
import { DayData } from "shared/types"

interface DaysState {
  entities: DayData[]
  isLoading: boolean
  error: any
}

const daysInitialState: DaysState = {
  entities: [],
  isLoading: false,
  error: null,
}

export const daysSlice = createSlice({
  name: "days",
  initialState: daysInitialState,
  reducers: {},
})

export const daysReducer = daysSlice.reducer
