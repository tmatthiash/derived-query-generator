import { render, screen } from "@testing-library/react";
import { Column } from "../../types/Column";
import { QueryArea } from "../QueryArea";

describe("query area", () => {
  describe("with integer in column", () => {
    beforeEach(() => {
      const listOfColumns: Column[] = [
        {
          name: "Count",
          id: "testID",
          type: "Integer",
          query: "LessThanEqual",
          ignoreCase: false,
          andOr: "",
        },
      ];

      render(<QueryArea columnList={listOfColumns} />);
    });

    it("should have the correct query string", () => {
      expect(screen.getAllByTestId("query-area")[0]).toHaveTextContent(
        "findByCountLessThanEqual(Integer Count)"
      );
    });
  });

  describe("with varchar in column", () => {
    beforeEach(() => {
      const listOfColumns: Column[] = [
        {
          name: "Name",
          id: "testID",
          type: "String",
          query: "Contains",
          ignoreCase: true,
          andOr: "",
        },
      ];

      render(<QueryArea columnList={listOfColumns} />);
    });

    it("should have the correct query string", () => {
      expect(screen.getAllByTestId("query-area")[0]).toHaveTextContent(
        "findByNameContainsIgnoreCase(String Name)"
      );
    });
  });

  describe("with boolean in column", () => {
    beforeEach(() => {
      const listOfColumns: Column[] = [
        {
          name: "isActive",
          id: "testID",
          type: "Boolean",
          query: "True()",
          ignoreCase: false,
          andOr: "",
        },
      ];

      render(<QueryArea columnList={listOfColumns} />);
    });

    it("should have the correct query string", () => {
      expect(screen.getAllByTestId("query-area")[0]).toHaveTextContent(
        "findByIsActiveTrue()(Boolean isActive)"
      );
    });
  });

  describe("with Date in column", () => {
    beforeEach(() => {
      const listOfColumns: Column[] = [
        {
          name: "startDate",
          id: "testID",
          type: "Date",
          query: "Before",
          ignoreCase: false,
          andOr: "",
        },
      ];

      render(<QueryArea columnList={listOfColumns} />);
    });

    it("should have the correct query string", () => {
      expect(screen.getAllByTestId("query-area")[0]).toHaveTextContent(
        "findByStartDateBefore(Date startDate)"
      );
    });
  });

  describe("with Collection in column", () => {
    beforeEach(() => {
      const listOfColumns: Column[] = [
        {
          name: "nameList",
          id: "testID",
          type: "Collection",
          query: "In",
          ignoreCase: false,
          andOr: "",
        },
      ];

      render(<QueryArea columnList={listOfColumns} />);
    });

    it("should have the correct query string", () => {
      expect(screen.getAllByTestId("query-area")[0]).toHaveTextContent(
        "findByNameListIn(Collection<nameList> nameList)"
      );
    });
  });
});
