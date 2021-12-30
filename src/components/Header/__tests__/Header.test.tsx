import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("should render the headers", () => {
    expect(screen.getByText("JPA Derived Query Generator")).toBeInTheDocument;
    expect(screen.getByText("Builds named queries for JPA repositories"))
      .toBeInTheDocument;
  });
});
