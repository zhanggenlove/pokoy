import styled from "styled-components"

export const SwipeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: transparent;
  color: var(--c-foreground);
  transition: none;
  padding: 1rem 2rem;
  margin: 1rem;
  margin-bottom: 6rem;
  border-radius: 3rem;
`
interface Props {
  isActive: boolean
}
export const Circle = styled.span<Props>`
  aspect-ratio: 1;
  width: 1.5rem;
  border-radius: 50%;
  margin: 1rem;
  display: block;
  border: 0.25rem solid var(--c-extra-gray);
  background-color: ${({ isActive }) =>
    isActive ? "var(--c-foreground)" : "transparent"};
`
