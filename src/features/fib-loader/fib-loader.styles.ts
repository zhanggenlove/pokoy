import styled, { keyframes } from "styled-components/macro"

const spinning = keyframes`
  from {
    opacity: 0;
    transform: rotate(0deg);
    box-shadow: inset 0px 0px 0px 20rem var(--c-gray);
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: rotate(-360deg);
    box-shadow: inset 0 0 0 0 var(--c-extra-gray);
  }
`

interface Props {
  stillLoading: boolean
}

export const Wrapper = styled.div<Props>`
  /* NOTE: opacity transition for fading off after appearance in animation */
  opacity: ${({ stillLoading }) => (stillLoading ? 1 : 0)};
  display: ${({ stillLoading }) => (stillLoading ? "flex" : "none")};
  transition: opacity 1s;
  will-change: opacity;
  background-color: var(--c-background);

  align-items: center;
  justify-content: center;

  overflow: hidden;
  position: absolute;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  z-index: 2;

  & > canvas {
    animation-name: ${spinning};
    animation-duration: 0.5s;
    animation-timing-function: ease-out;

    background: var(--c-background);
    border-radius: 50%;
    padding: 0px;
  }
`
