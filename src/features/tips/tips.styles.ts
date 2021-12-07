import styled from "styled-components/macro"

export const Wrapper = styled.span`
  color: var(--c-extra-gray);
  margin-top: 3rem;
  margin-bottom: 0;
  font-size: 2rem;
  cursor: default;
`

interface Props {
  stage: number
}

export const StageWrapper = styled.span<Props>`
  margin: 0;
`
