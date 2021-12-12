import React, { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "features/app/firebase-init"
import { Pokoy } from "features/Pokoy/Pokoy"
import { SignIn } from "features/SignIn/SignIn"
import { FibLoader } from "features/fib-loader"
import { AppUpdater } from "features/app-updater"
import { Wrapper, SwipeableView, SwipeButton } from "./app.styles"
import { Header } from "components/header/header.component"
import SwipeableViews from "react-swipeable-views"
import { UserStats } from "features/user-stats/user-stats"

export const App: React.FC = () => {
  const [user, loading] = useAuthState(auth)
  const [slideIndex, setSlideIndex] = useState(0)

  const userNotExist = !loading && !user
  const isStillLoading = loading && !user
  const userExist = !loading && user

  return (
    <Wrapper>
      <Header />
      <AppUpdater />

      {/* // TODO: extract to components */}
      <SwipeButton
        type="button"
        onClick={() => setSlideIndex(Number(!slideIndex))}
      >
        {!!slideIndex ? "To meditation" : "To statistics"}
      </SwipeButton>

      <SwipeableViews
        resistance
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
        containerStyle={{
          width: "100%",
        }}
        index={slideIndex}
      >
        <SwipeableView>
          <FibLoader stillLoading={isStillLoading} />

          {userNotExist && <SignIn />}
          {userExist && <Pokoy user={user} />}
        </SwipeableView>

        <SwipeableView>
          {userExist && <UserStats user={user} />}
          {userNotExist && <span>Oops!</span>}
        </SwipeableView>
      </SwipeableViews>
    </Wrapper>
  )
}
