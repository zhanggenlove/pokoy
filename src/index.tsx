import React from "react"
import ReactDOM from "react-dom"
import { App } from "./features/app"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import "./global.css"
import { showAppVersion } from "shared/utils/show-app-version"
import { onServiceWorkerUpdate } from "@3m1/service-worker-updater"

ReactDOM.render(
  <React.StrictMode>
    {/* TODO: rename Home component to App */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

showAppVersion()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  // NOTE: from https://github.com/emibcn/service-worker-updater#usage
  onUpdate: onServiceWorkerUpdate,
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
