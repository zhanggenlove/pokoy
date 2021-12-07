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
`

export const SwipeableView = styled.div`
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  position: relative;
  flex: 1 1 auto;
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

export const OfflineStatusWrapper = styled.span``

export const SwipeButton = styled.button`
  position: absolute;
  top: 0;
  background-color: transparent;
  color: var(--c-foreground);
  box-shadow: 0 0 0 0.25rem var(--c-extra-gray);
  transition: none;
  margin: 1rem;
  margin-top: 2rem;

  @media screen and (any-pointer: none) {
    display: none;
  }
`
