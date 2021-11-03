import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "features/Home/firebase-init";

export const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};
