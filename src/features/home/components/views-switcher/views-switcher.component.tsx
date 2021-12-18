import React from "react"
import { Circle, SwipeButton } from "./views-switcher.styles"

interface Props {
  slideIndex: number
  setSlideIndex: (index: number) => void
}
export const ViewsSwitcher: React.FC<Props> = ({
  slideIndex,
  setSlideIndex,
}) => {
  return (
    <SwipeButton
      type="button"
      onClick={() => setSlideIndex(Number(!slideIndex))}
    >
      <Circle isActive={slideIndex === 0} />
      <Circle isActive={slideIndex === 1} />
    </SwipeButton>
  )
}
