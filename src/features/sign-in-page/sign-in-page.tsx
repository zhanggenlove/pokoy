import { SignIn } from "features/SignIn/SignIn"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const SignInPage = () => {
  return (
    <Wrapper>
      <SignIn />
    </Wrapper>
  )
}
