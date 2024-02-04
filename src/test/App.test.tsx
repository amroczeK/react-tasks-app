import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Testing App", () => {
  it("Should render with no tasks.", () => {
    render(<App />);
    // screen.debug(); // View the rendered dom
    const title = screen.queryByText(/Today's list/);
    expect(title).toBeVisible();
  });
});
