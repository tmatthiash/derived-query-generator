import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColumnList } from "../ColumnList";

describe("Column List", () => {
  describe("Add varchar", () => {
    beforeEach(() => {
      render(<ColumnList />);
      userEvent.type(screen.getByLabelText("Additional Field Name"), "test");
      userEvent.click(screen.getByLabelText("Query Data Type"));
      userEvent.click(screen.getByText("VarChar"));
      userEvent.click(screen.getByText("Add To List"));

      userEvent.click(screen.getByLabelText("Query Type"));
    });

    it("should have 9 options", () => {
      expect(screen.getAllByRole("option")).toHaveLength(9);
    });
  });

  describe("Add Integer", () => {
    beforeEach(() => {
      render(<ColumnList />);
      userEvent.type(screen.getByLabelText("Additional Field Name"), "test");
      userEvent.click(screen.getByLabelText("Query Data Type"));
      userEvent.click(screen.getByText("Integer"));
      userEvent.click(screen.getByText("Add To List"));

      userEvent.click(screen.getByLabelText("Query Type"));
    });

    it("should have 7 options", () => {
      expect(screen.getAllByRole("option")).toHaveLength(7);
    });
  });

  describe("Add boolean", () => {
    beforeEach(() => {
      render(<ColumnList />);
      userEvent.type(screen.getByLabelText("Additional Field Name"), "test");
      userEvent.click(screen.getByLabelText("Query Data Type"));
      userEvent.click(screen.getByText("Boolean"));
      userEvent.click(screen.getByText("Add To List"));

      userEvent.click(screen.getByLabelText("Query Type"));
    });

    it("should have 4 options", () => {
      expect(screen.getAllByRole("option")).toHaveLength(4);
    });
  });

  describe("Add Date", () => {
    beforeEach(() => {
      render(<ColumnList />);
      userEvent.type(screen.getByLabelText("Additional Field Name"), "test");
      userEvent.click(screen.getByLabelText("Query Data Type"));
      userEvent.click(screen.getByText("Date"));
      userEvent.click(screen.getByText("Add To List"));

      userEvent.click(screen.getByLabelText("Query Type"));
    });

    it("should have 6 options", () => {
      expect(screen.getAllByRole("option")).toHaveLength(6);
    });
  });

  describe("Add collection", () => {
    beforeEach(() => {
      render(<ColumnList />);
      userEvent.type(screen.getByLabelText("Additional Field Name"), "test");
      userEvent.click(screen.getByLabelText("Query Data Type"));
      userEvent.click(screen.getByText("Collection"));
      userEvent.click(screen.getByText("Add To List"));

      userEvent.click(screen.getByLabelText("Query Type"));
    });

    it("should have 2 options", () => {
      expect(screen.getAllByRole("option")).toHaveLength(2);
    });
  });
});
