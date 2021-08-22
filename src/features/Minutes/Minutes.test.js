import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Minutes } from "./Minutes";

describe("Minutes", () => {
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

  describe("when timer is started", () => {
    it("should display stage for less than 0 minute, but less than 1", () => {
      act(() => {
        render(<Minutes seconds={1} />, container);
      });
      expect(container.textContent).toBe("0m");
    });

    it("should display stage for less than 1 minute, but less than 2", () => {
      act(() => {
        render(<Minutes seconds={61} />, container);
      });
      expect(container.textContent).toBe("1m");
    });

    it("should display stage for more than 2 minutes, but less than 3", () => {
      act(() => {
        render(<Minutes seconds={121} />, container);
      });
      expect(container.textContent).toBe("2m");
    });

    it("should display stage for less than 3 minutes, but less than 5", () => {
      act(() => {
        render(<Minutes seconds={181} />, container);
      });
      expect(container.textContent).toBe("3m");
    });

    it("should display stage for less than 5 minutes, but less than 8", () => {
      act(() => {
        render(<Minutes seconds={301} />, container);
      });
      expect(container.textContent).toBe("5m");
    });

    it("should display stage for less than 8 minutes, but less than 13", () => {
      act(() => {
        render(<Minutes seconds={481} />, container);
      });
      expect(container.textContent).toBe("8m");
    });

    it("should display stage for less than 13 minutes, but less than 21", () => {
      act(() => {
        render(<Minutes seconds={781} />, container);
      });
      expect(container.textContent).toBe("13m");
    });

    it("should display stage for end of 13th minute (penultimate timer)", () => {
      act(() => {
        render(<Minutes seconds={780} />, container);
      });
      expect(container.textContent).toBe("13m");
    });

    it("should display stage for end of 21th minute (last timer)", () => {
      act(() => {
        render(<Minutes seconds={1260} />, container);
      });
      expect(container.textContent).toBe("21m");
    });
  });

  describe("for bugs", () => {
    test("should display properly stage on 11th minute", () => {
      act(() => {
        render(<Minutes seconds={659} />, container);
      });

      expect(container.textContent).toBe("8m");
    });

    test("should display 8th stage on 12th minute", () => {
      act(() => {
        render(<Minutes seconds={661} />, container);
      });

      expect(container.textContent).toBe("8m");
    });
  });
});
