import React, { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "features/home/firebase-init"
import { Pokoy } from "features/home/components/pokoy/Pokoy"
import { FibLoader } from "features/home/components/fib-loader"
import { Wrapper, SwipeableView, SwipeButton } from "./app.styles"
import SwipeableViews from "react-swipeable-views"
import { UserStats } from "features/user-stats/user-stats"
import { User } from "firebase/auth"
import { Header } from "./components/header/header.component"
import { AppUpdater } from "./components/app-updater"

export const App: React.FC = () => {
  const [user, loading] = useAuthState(auth)
  const [slideIndex, setSlideIndex] = useState(0)

  const isStillLoading = loading && !user

  const swipeableViewsStyles = {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  }
  const swipeableViewsContainerStyles = {
    width: "100%",
  }

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
        style={swipeableViewsStyles}
        containerStyle={swipeableViewsContainerStyles}
        index={slideIndex}
        resistance
      >
        <SwipeableView>
          <FibLoader stillLoading={isStillLoading} />
          <Pokoy user={user as User} />
        </SwipeableView>

        <SwipeableView>
          {!isStillLoading && <UserStats user={user as User} />}
        </SwipeableView>
      </SwipeableViews>
    </Wrapper>
  )
}
