import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

exports.aggregate = functions.firestore
  .document("pokoys/{pokoyId}")
  .onCreate(async (snapshot, context) => {
    const pokoy = snapshot.data();

    const aggregateRef = db.doc("aggregation/pokoys");
    const aggregationDoc = await aggregateRef.get();
    const aggregationData = aggregationDoc.data();

    if (!aggregationData) return;
    
    const totalMins = aggregationData.total + pokoy.duration
    const newAggregation = {
      totalMins,
      totalHours: Math.floor(totalMins / 60),
      count: aggregationData.count + 1,
      lastFive: [pokoy, ...aggregationData.lastFive.slice(0, 4)],
    };

    return aggregateRef.set(newAggregation);
  });
