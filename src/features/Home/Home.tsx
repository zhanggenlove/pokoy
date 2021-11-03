import React from "react";
import styles from "./Home.module.css";
import { auth } from "features/Home/firebase-init";
import { useAuthState } from "react-firebase-hooks/auth";
import { Pokoy } from "features/Pokoy/Pokoy";
import { SignIn } from "./SignIn";

// TODO: refactor this component
export const Home: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <main className={styles["app-wrapper"]}>
      {user ? <Pokoy user={user} /> : <SignIn />}
    </main>
  );
};
