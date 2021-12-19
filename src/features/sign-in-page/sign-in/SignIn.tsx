import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "features/home/firebase-init"
import { useLocation, useNavigate } from "react-router-dom"
import { ReactComponent as GoogleLogo } from "./google-logo.svg"
import { Info, SignInButton, Wrapper } from "./sign-in.styles"

export const SignIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const signInAsAnon = async () => {
    try {
      await signInAnonymously(auth)
      navigate(from, { replace: true })
    } catch (error) {
      console.error(error)
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    try {
      await signInWithPopup(auth, provider)
      navigate(from, { replace: true })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Wrapper>
      <SignInButton type="button" onClick={signInWithGoogle}>
        Sign in with
        <GoogleLogo />
      </SignInButton>
      <SignInButton type="button" onClick={signInAsAnon}>
        Sign in anonymously
        <Info>ℹ</Info>
      </SignInButton>
    </Wrapper>
  )
}
