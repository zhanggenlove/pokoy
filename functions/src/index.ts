import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { DayData } from "./types";
import { INIT_USER_STATS } from "./constants";

admin.initializeApp();
const db = admin.firestore();


exports.updateUserStats = functions.firestore
  .document("days/{dayId}")
  .onWrite(async (dayChange, context) => {
    const dayAfterChange = dayChange.after;
    const dayData = dayAfterChange.data() as DayData;
    const userId = dayData.userId;
    const statsDocId = dayData.statsRef.id;
    const userStatsRef = db.doc(`stats/${statsDocId}`);
    const userStatsSnapshot = await userStatsRef.get();
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
      await userStatsRef.set(newUserStats);
      console.log('SUCCESS');
    } catch(e) {
      console.error('ERROR: ', e)
    }
  });
