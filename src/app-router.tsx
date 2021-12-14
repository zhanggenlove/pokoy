import { RequireAuth } from "components/require-auth"
import { App } from "features/app"
import { DevPage } from "features/dev-page"
import { SignInPage } from "features/sign-in-page/sign-in-page"
import { Route, Routes } from "react-router-dom"

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
