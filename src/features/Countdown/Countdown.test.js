import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Countdown } from "./Countdown";

describe("Countdown", () => {
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
      render(<Countdown progress={300} />, container);
    });

    const value = container.textContent;
    expect(/\d\d:\d\d/.test(value)).toBe(true);
  });

  describe("should display properly remain time", () => {
    it("should display remain time for less than 1 minute, but more than 0", () => {
      act(() => {
        render(<Countdown seconds={1} />, container);
      });
      expect(container.textContent).toBe("00:59");
    });

    it("should display remain time for less than 2 minute, but more than 1", () => {
      act(() => {
        render(<Countdown seconds={61} />, container);
      });
      expect(container.textContent).toBe("00:59");
    });

    it("should display remain time for less than 3 minutes, but more than 2", () => {
      act(() => {
        render(<Countdown seconds={121} />, container);
      });
      expect(container.textContent).toBe("00:59");
    });

    it("should display remain time for less than 5 minutes, but more than 3", () => {
      act(() => {
        render(<Countdown seconds={181} />, container);
      });
      expect(container.textContent).toBe("01:59");
    });

    it("should display remain time for less than 8 minutes, but more than 5", () => {
      act(() => {
        render(<Countdown seconds={301} />, container);
      });
      expect(container.textContent).toBe("02:59");
    });

    it("should display remain time for less than 13 minutes, but more than 8", () => {
      act(() => {
        render(<Countdown seconds={481} />, container);
      });
      expect(container.textContent).toBe("04:59");
    });

    it("should display remain time for less than 21 minutes, but more than 13", () => {
      act(() => {
        render(<Countdown seconds={781} />, container);
      });
      expect(container.textContent).toBe("07:59");
    });
  });
});
