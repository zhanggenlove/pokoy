import { useOnline } from "@saulpalv/useonline"
import { OfflineStatus } from "components/header/offline-status"
import { SignOut } from "components/header/sign-in"
import { Wrapper } from "./header.styles"

interface Props {}

export const Header: React.FC<Props> = () => {
  const isOnline = useOnline()

  return (
    <Wrapper>
      <SignOut />
      {!isOnline && <OfflineStatus />}
    </Wrapper>
  )
}
