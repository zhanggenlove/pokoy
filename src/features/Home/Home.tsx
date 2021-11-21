import React from "react";
import styles from "./Home.module.css";
import { auth } from "features/Home/firebase-init";
import { useAuthState } from "react-firebase-hooks/auth";
import { Pokoy } from "features/Pokoy/Pokoy";
import { SignIn } from "./SignIn";
import { useOnline } from "@saulpalv/useonline";
import { OfflineStatus } from "./OfflineStatus";

// TODO: refactor this component
export const Home: React.FC = () => {
  const [user] = useAuthState(auth);
  const isOnline = useOnline();

  return (
    <main className={styles["app-wrapper"]}>
      {user ? <Pokoy user={user} /> : <SignIn />}
      {!isOnline && <OfflineStatus />}
    </main>
  );
};
