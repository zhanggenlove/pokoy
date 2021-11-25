import React from "react"
import { ProgressContainer } from "features/Progress/ProgressContainer"
import { ProgressWrapper, Wrapper } from "./fib-loader.styles"
import { useTransition, animated } from "react-spring"

type Props = {
  loading: boolean
}

export const FibLoader: React.FC<Props> = ({ loading }) => {
  const transition = useTransition(loading, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <Wrapper>
      {transition(
        (style, item) =>
          item && (
            <animated.div style={style}>
              <ProgressWrapper>
                <ProgressContainer value={0} />
              </ProgressWrapper>
            </animated.div>
          )
      )}
    </Wrapper>
  )
}

FibLoader.defaultProps = {
  loading: false,
}
