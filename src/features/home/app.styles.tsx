import styled from "styled-components/macro"

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  text-align: center;
  justify-content: center;
  position: relative;
  height: 100%;

  /* NOTE: for iframe in Notion */
  @media screen and (max-width: 300px) {
    & {
      justify-content: flex-end;
    }
  }

  @media screen and (max-width: 500px) {
    & {
      margin: 0 4rem;
    }
  }
`

export const SwipeableView = styled.div`
  height: 100%;
`

export const ProgressSpiralWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const AnimationWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3em;
`
