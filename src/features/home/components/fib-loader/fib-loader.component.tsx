import React from "react"
import { ProgressContainer } from "shared/components/progress/ProgressContainer"
import { Wrapper } from "./fib-loader.styles"

type Props = {
  stillLoading: boolean
}

export const FibLoader: React.FC<Props> = ({ stillLoading = false }) => {
  return (
    <Wrapper stillLoading={stillLoading}>
      <ProgressContainer value={0} />
    </Wrapper>
  )
}
