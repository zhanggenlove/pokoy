import { combineReducers } from "@reduxjs/toolkit"
import { daysReducer } from "features/user-stats/days-slice"
import { statsReducer } from "features/user-stats/stats-slice"

export const rootReducer = combineReducers({
  stats: statsReducer,
  days: daysReducer,
})
