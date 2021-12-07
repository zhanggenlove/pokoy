import styled from "styled-components/macro"

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  /* // TODO: extract breakpoints to constants */
  @media screen and (min-width: 500px) {
    .bottom-text {
      font-size: 4rem;
    }
  }
`

export const TopTextWrapper = styled.p`
  margin: 0;
  margin-bottom: 1.5em;
`
