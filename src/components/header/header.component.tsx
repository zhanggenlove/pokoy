import { useOnline } from "@saulpalv/useonline"
import { OfflineStatus } from "components/offline-status"
import { SignOut } from "components/sign-in"
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
