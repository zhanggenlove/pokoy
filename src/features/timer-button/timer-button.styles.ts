import { REQUEST_STATUS_TO_COLOR_MAP } from "shared/constants"
import { RequestStatus } from "shared/types"
import styled from "styled-components"

interface Props {
  requestStatus: RequestStatus
}

export const ButtonWrapper = styled.button<Props>`
  color: ${({ requestStatus }) =>
    REQUEST_STATUS_TO_COLOR_MAP.get(requestStatus)};

  padding: 0px;
  display: block;
  background-color: transparent;
  position: relative;
  transition: color 1s ease-out, transform ease-out 0.3s;

  /* NOTE: pseudo-element for opaque button border with dinamic color */
  &:after {
    box-shadow: 0px 0px 0px 0.5rem currentcolor;
    transform: scale(1);

    display: block;
    position: absolute;
    top: 0;
    content: "";
    width: 100%;
    height: 100%;
    color: inherit;
    opacity: 0.6;
    border-radius: 50%;

    &:hover:after,
    &:focus:after {
      transform: scale(0.97);
    }
  }
`
