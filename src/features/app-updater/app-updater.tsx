import React from "react"
import {
  withServiceWorkerUpdater,
  ServiceWorkerUpdaterProps,
  LocalStoragePersistenceService,
} from "@3m1/service-worker-updater"
import { StyledButton, Wrapper } from "./app-updater.styles"

const AppUpdater: React.FC<ServiceWorkerUpdaterProps> = (props) => {
  const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props
  const currentVersion = process?.env?.REACT_APP_VERSION

  return (
    <Wrapper>
      {newServiceWorkerDetected ? (
        <span>
          New version detected {" → "}
          <StyledButton type="button" onClick={onLoadNewServiceWorkerAccept}>
            Update
          </StyledButton>
        </span>
      ) : (
        `ver. ${currentVersion}`
      )}
    </Wrapper>
  )
}

export default withServiceWorkerUpdater(AppUpdater, {
  log: () => console.warn("App updated!"),
  persistenceService: new LocalStoragePersistenceService("pokoyApp"),
})
