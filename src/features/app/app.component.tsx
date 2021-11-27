import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "features/app/firebase-init"
import { Pokoy } from "features/Pokoy/Pokoy"
import { SignIn } from "features/SignIn/SignIn"
import { FibLoader } from "features/fib-loader"
import { AppUpdater } from "features/app-updater"
import { Wrapper } from "./app.styles"
import { Header } from "components/header/header.component"

export const App: React.FC = () => {
  const [user, loading] = useAuthState(auth)

  const userNotExist = !loading && !user
  const isStillLoading = loading && !user
  const userExist = !loading && user

  return (
    <Wrapper>
      <Header />
      <AppUpdater />
      <FibLoader stillLoading={isStillLoading} />

      {userNotExist && <SignIn />}
      {userExist && <Pokoy user={user} />}
    </Wrapper>
  )
}
