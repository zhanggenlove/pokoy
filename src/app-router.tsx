import { App } from "features/home"
import { DevPage } from "features/dev-page"
import { SignInPage } from "features/sign-in-page/sign-in-page"
import { Route, Routes } from "react-router-dom"
import { RequireAuth } from "shared/components/require-auth"

export const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<SignInPage />} />
    <Route
      path="/"
      element={
        <RequireAuth>
          <App />
        </RequireAuth>
      }
    />
    <Route path="dev" element={<DevPage />} />
    {/* // TODO: add route for authentication */}
    {/* <Route path="sign-in" element={<App />} /> */}
  </Routes>
)
