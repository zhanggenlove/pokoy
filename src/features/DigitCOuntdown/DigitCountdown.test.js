import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { DigitCountdown } from "./DigitCountdown";

describe("DigitCountdown", () => {
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

  it("should display remain time in MM:SS format", () => {
    act(() => {
      render(<DigitCountdown progress={300} />, container);
    });

    const value = container.textContent;
    expect(/\d\d:\d\d/.test(value)).toBe(true);
  });

  describe("should display properly remain time", () => {
    it("should display properly remain minutes", () => {
      act(() => {
        render(<DigitCountdown seconds={1} />, container);
      });

      const value = container.textContent;
      const minutes = value.split("").slice(0, 2).join("");
      expect(minutes).toBe("00");
    });

    it("should display properly remain seconds", () => {
      act(() => {
        render(<DigitCountdown seconds={1} />, container);
      });

      const value = container.textContent;
      const seconds = value.split("").slice(3).join("");
      expect(seconds).toBe("59");
    });

    it("should display properly remain time", () => {
      act(() => {
        render(<DigitCountdown seconds={1} />, container);
      });

      const value = container.textContent;
      expect(value).toBe("00:59");
    });
  });
});
