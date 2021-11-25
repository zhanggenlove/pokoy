import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
  text-align: center;
  justify-content: center;
  position: relative;

  /* NOTE: for iframe in Notion */
  @media screen and (max-width: 300px) {
    & {
      justify-content: flex-end;
    }
  }
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

export const OfflineStatusWrapper = styled.span``
