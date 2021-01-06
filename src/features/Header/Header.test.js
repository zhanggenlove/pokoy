import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Header } from "./Header";

describe("Header", () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("should be defined", () => {
    act(() => {
      render(<Header />, container);
    });
    expect(container.textContent.length).toBeGreaterThan(1);
  });

  it("should be contain h1 with greetings", () => {
    act(() => {
      render(<Header />, container);
    });
    expect(container.querySelector("h1")).toBeDefined();
  });
});
