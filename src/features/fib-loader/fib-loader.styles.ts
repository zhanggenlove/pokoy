import styled, { keyframes } from "styled-components";

const spinning = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;

  & > canvas {
    animation: ${spinning} 2s linear infinite reverse;
    border-radius: 50%;
    background-color: var(--c-background);
    box-shadow: 0px 0px 4px 0px currentcolor;
    padding: 0px;
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
`;
