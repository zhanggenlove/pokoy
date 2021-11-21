import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { DayData, UserStats } from "./types";
import { getDoc, setDoc } from "firebase/firestore";

admin.initializeApp();

const INIT_USER_STATS: UserStats = {
  totalDuration: 0,
  count: 0,
  userId: ''
};

exports.updateUserStats = functions.firestore
  .document("days/{dayId}")
  .onWrite(async (dayChange, context) => {
    const dayAfterChange = dayChange.after;
    const dayData = dayAfterChange.data() as DayData;
    const userId = dayData.userId;
    const userStatsSnapshot = await getDoc(dayData.statsRef);
    const userStatsData = userStatsSnapshot.data();

    if (!userStatsData) return;

    const userStats = userStatsData || INIT_USER_STATS;
    const totalDuration = userStats.totalDuration + dayData.totalDuration
    const newUserStats = {
      totalDuration,
      count: userStats.count + 1,
      userId,
    };

    try {
      await setDoc(dayData.statsRef, newUserStats)
    } catch(e) {
      console.error('ERROR: ', e)
    }
  });
