import { App } from "features/app"
import { DevPage } from "features/dev-page"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="dev" element={<DevPage />} />
      {/* // TODO: add route for authentication */}
      {/* <Route path="sign-in" element={<App />} /> */}
    </Routes>
  </BrowserRouter>
)
