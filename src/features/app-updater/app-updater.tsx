import React from "react"
import {
  withServiceWorkerUpdater,
  ServiceWorkerUpdaterProps,
  LocalStoragePersistenceService,
} from "@3m1/service-worker-updater"
import { StyledButton, Wrapper } from "./styles"

const AppUpdater: React.FC<ServiceWorkerUpdaterProps> = (props) => {
  const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props

  return newServiceWorkerDetected ? (
    <Wrapper>
      New version detected {" → "}
      <StyledButton type="button" onClick={onLoadNewServiceWorkerAccept}>
        Update
      </StyledButton>
    </Wrapper>
  ) : null // NOTE: If no update is available, render nothing
}

export default withServiceWorkerUpdater(AppUpdater, {
  log: () => console.warn("App updated!"),
  persistenceService: new LocalStoragePersistenceService("pokoyApp"),
})
