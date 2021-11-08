import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/firestore";

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

/* eslint-disable-next-line max-statements */
onAuthStateChanged(auth, async (user): Promise<void> => {
  if (user !== null) {
    const userDocRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    const userData = {
      name: user.displayName,
      email: user.email,
    };

    if (userDoc === null) {
      const usersColRef = collection(firestore, "users");
      await addDoc(usersColRef, userData);
    }
  } else {
    console.log("No user");
  }
});

export const getPokoysTotalDuration = async () => {
  const q = query(collection(firestore, "pokoys"));
  let count = 0;
  const querySnapshot = await getDocs(q);
  const total = querySnapshot.docs.reduce((acc, doc) => {
    // console.log(doc.data().duration);
    count = count + 1;
    return acc + doc.data().duration;
  }, 0);
  console.log(total, count);
  return total;
};
