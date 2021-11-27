import React from "react"
import { ProgressContainer } from "features/Progress/ProgressContainer"
import { Wrapper } from "./fib-loader.styles"

type Props = {
  loading: boolean
}

export const FibLoader: React.FC<Props> = ({ loading }) => {
  return (
    <Wrapper loading={loading}>
      <ProgressContainer value={0} />
    </Wrapper>
  )
}

FibLoader.defaultProps = {
  loading: false,
}
