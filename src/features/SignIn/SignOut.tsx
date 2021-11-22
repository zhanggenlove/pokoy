import { useCallback } from "react";
import { auth } from "features/Home/firebase-init";
import styles from "./SignIn.module.css";

export const SignOut = () => {
  const signOut = useCallback(() => auth.signOut(), []);

  return (
    auth.currentUser && (
      <button className={styles["sign-out"]} onClick={signOut}>
        Sign out
      </button>
    )
  );
};
