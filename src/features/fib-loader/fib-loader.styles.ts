import styled, { keyframes } from "styled-components"

const spinning = keyframes`
  from {
    opacity: 0;
    transform: rotate(0deg);
  }

  100% {
    opacity: 1;
    transform: rotate(-360deg);
  }
`

interface Props {
  loading: boolean
}

export const Wrapper = styled.div<Props>`
  opacity: ${({ loading }) => (loading ? 1 : 0)};

  display: flex;
  align-items: center;
  justify-content: center;

  margin: auto;
  width: 100%;
  position: absolute;
  width: 100%;
  transition: opacity 1s;

  & > canvas {
    animation-name: ${spinning};
    animation-duration: 0.3s;
    animation-timing-function: ease-out;

    background-color: var(--c-background);
    box-shadow: 0px 0px 0px 0.5rem currentcolor;
    border-radius: 50%;
    padding: 0px;
  }
`
