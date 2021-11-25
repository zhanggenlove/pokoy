import { render, unmountComponentAtNode } from "react-dom"
import { act, isCompositeComponent } from "react-dom/test-utils"

const mockData = {
  Countdown: "00:00",
  TimerButton: "TimerButton",
  FibonacciProgress: "Канвас с графикой",
}
jest.mock("../../features", () => {
  return {
    Countdown: () => <h1>{mockData.Countdown}</h1>,
    TimerButton: () => <button>{mockData.TimerButton}</button>,
    FibonacciProgress: () => <canvas>{mockData.FibonacciProgress}</canvas>,
  }
})

/* eslint-disable-next-line */
import Home from "./Home"

describe("Home", () => {
  let container = null

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  it("should be defined", () => {
    act(() => {
      render(<Home />, container)
    })
    expect(container.textContent.length).toBeGreaterThan(1)
  })

  it("should contain components", () => {
    act(() => {
      render(<Home />, container)
    })
    expect(container.querySelector("h1").textContent).toEqual(mockData.Header)
    expect(container.querySelector("button").textContent).toEqual(
      mockData.TimerButton
    )
    expect(container.querySelector("canvas").textContent).toEqual(
      mockData.FibonacciProgress
    )
  })
})
