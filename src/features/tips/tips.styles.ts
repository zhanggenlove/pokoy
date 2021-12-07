import styled from "styled-components/macro"

export const Wrapper = styled.span`
  color: var(--c-extra-gray);
  margin-top: 1.5rem;
  margin-bottom: 0;
  font-size: medium;
  cursor: default;
`

interface Props {
  stage: number
}

export const StageWrapper = styled.span<Props>`
  margin: 0;
`
