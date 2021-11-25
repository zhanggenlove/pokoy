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

  const isStillLoading = loading && !user
  const userNotExist = !loading && !user
  const userExist = !loading && user

  return (
    <Wrapper>
      <Header />

      {userNotExist && <SignIn />}
      {userExist && <Pokoy user={user} />}

      <FibLoader loading={isStillLoading} />
      <AppUpdater />
    </Wrapper>
  )
}
