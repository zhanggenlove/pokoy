import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/firestore";
import { INIT_USER_STATS } from "shared/constants";

const firebaseConfig = {
  apiKey: "AIzaSyCi-EqHSZokQvSvemUnyQ_gFV6Aq3u44Ig",
  authDomain: "pokoy-1bf7f.firebaseapp.com",
  projectId: "pokoy-1bf7f",
  storageBucket: "pokoy-1bf7f.appspot.com",
  messagingSenderId: "550756523308",
  appId: "1:550756523308:web:adfbe8e9b9157844f2a089",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

// eslint-disable-next-line max-statements
onAuthStateChanged(auth, async (user): Promise<void | never> => {
  if (user === null) {
    throw Error("No authenticated user");
  }

  const userDocRef = doc(firestore, "users", user.uid);
  const userDoc = await getDoc(userDocRef);
  const newUserData = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    statistics: INIT_USER_STATS,
  };

  const userData = userDoc.data();
  if (!userData) {
    await setDoc(userDocRef, newUserData);
  }
});

export const getPokoysTotalDuration = async () => {
  const q = query(
    collection(firestore, "pokoys"),
    where("user", "==", "/users/rnuYUc9vigMVMkYqs70cSDBTgSm2")
  );

  const querySnapshot = await getDocs(q);
  const total = querySnapshot.docs.reduce(
    (acc, doc) => acc + doc.data().duration,
    0
  );

  console.log(total, querySnapshot.docs.length);
  return total;
};
