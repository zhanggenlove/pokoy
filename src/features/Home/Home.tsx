import React from "react"
import styles from "./Home.module.css"
import { auth } from "features/Home/firebase-init"
import { useAuthState } from "react-firebase-hooks/auth"
import { Pokoy } from "features/Pokoy/Pokoy"
import { useOnline } from "@saulpalv/useonline"
import { OfflineStatus } from "./OfflineStatus"
import { SignIn } from "features/SignIn/SignIn"
import { FibLoader } from "features/fib-loader"
import { AppUpdater } from "features/app-updater"

// TODO: refactor this component
export const Home: React.FC = () => {
  const [user, loading] = useAuthState(auth)
  const isOnline = useOnline()

  const isStillLoading = loading && !user
  const userNotExist = !loading && !user
  const userExist = !loading && user

  return (
    <main className={styles["app-wrapper"]}>
      {userNotExist && <SignIn />}

      <FibLoader loading={isStillLoading} />

      {userExist && <Pokoy user={user} />}

      {!isOnline && <OfflineStatus />}

      <AppUpdater />
    </main>
  )
}
