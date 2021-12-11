import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import { DayData, UserStatsData } from "./types"
import { INIT_USER_STATS } from "./constants"

admin.initializeApp()
// const db = admin.firestore()

exports.updateUserStats = functions.firestore
  .document("days/{dayId}")
  .onWrite(async (changes) => {
    const daySnapshotAfterChanges = changes.after
    const dayData = daySnapshotAfterChanges.data() as DayData
    
    const userStatsRef = dayData.statsRef
    const userStatsSnapshot = await userStatsRef.get()
    const userStatsData = userStatsSnapshot?.data()
    
    const userStats = userStatsData || INIT_USER_STATS
    const totalDuration = userStats.totalDuration + dayData.totalDuration
    const userId = dayData.userId
    
    const newUserStats: UserStatsData = {
      userId,
      totalDuration,
      count: userStats.count + 1,
      firstMeditationDate: userStats.firstMeditationDate,
    }

    try {
      await userStatsRef.set(newUserStats)
      console.log("SUCCESS")
    } catch (e) {
      console.error("ERROR: ", e)
    }
  })
