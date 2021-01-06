import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

jest.mock("./ProgressDrawer", () => ({
  Progress: () => <canvas></canvas>,
}));

jest.mock("./Sound", () => ({
  Sound: () => <audio></audio>,
}));

describe("FibonacciProgress", () => {
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

  it('should contain "ProgressDrawer Component"');

  it('should contain "Sound Component"');

  it("should have default stages");

  describe("progress job", () => {
    it("should call init function/method by your-self when start event coming");

    it(
      'should call resetCanvas function/method of "ProgressDrawer" component when start event coming'
    );

    it(
      'should in 10 ticks call drawNext function/method of "ProgressDrawer" 10 times'
    );

    it("should stop ticks after stop event");
  });
});
