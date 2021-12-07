import { useCallback } from "react"
import { auth } from "features/app/firebase-init"
import styled from "styled-components/macro"

const StyledButton = styled.button`
  background-color: transparent;
  padding: 2rem;
  padding-left: 0;
  font-size: inherit;
  color: inherit;
  cursor: pointer;
`

export const SignOut = () => {
  const signOut = useCallback(() => auth.signOut(), [])

  return (
    auth.currentUser && (
      <StyledButton type="button" onClick={signOut}>
        Sign out
      </StyledButton>
    )
  )
}
