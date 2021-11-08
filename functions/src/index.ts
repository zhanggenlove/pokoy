import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const INIT_USER_STATS = {
  totalDuration: 0,
  count: 0,
  lastFive: [],
};

exports.updateUserStats = functions.firestore
  .document("pokoys/{pokoyId}")
  .onCreate(async (snapshot, context) => {
    const pokoyData = snapshot.data();
    const userRef = pokoyData.user as FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;

    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();

    if (!userData) return;
    
    const userStats = userData?.statistics || INIT_USER_STATS
    const totalDuration = userStats.totalDuration + pokoyData.duration
    const newuserStats = {
      totalDuration,
      count: userStats.count + 1,
      lastFive: [pokoyData, ...userStats.lastFive.slice(0, 4)],
    };

    return userRef.set(newuserStats);
  });
