import styled from "styled-components";

const REQUEST_STATUS_TO_COLOR_MAP = new Map([
  ["NONE", "black"],
  ["REQUEST", "brown"],
  ["SUCCESS", "green"],
  ["FAILURE", "red"],
]);

interface Props {
  requestStatus: "NONE" | "REQUEST" | "SUCCESS" | "FAILURE";
  isStarted: boolean;
}

export const ButtonWrapper = styled.button<Props>`
  && {
    color: ${(props) => REQUEST_STATUS_TO_COLOR_MAP.get(props.requestStatus)};

    border-style: solid;
    border-radius: 50%;
    border-width: 3px;
    color: var(--c-gray);
    box-shadow: 0px 0px 4px 0px currentcolor;
    border-radius: 50%;
    transition: box-shadow ease-out 0.3s, transform ease-out 0.1s;
    background-color: transparent;
    padding: 0px;
    display: block;

    &:hover,
    &:focus {
      box-shadow: 0px 0px 0px 4px currentcolor;
    }

    &:focus {
      transform: scale(0.99);
    }
  }
`;
