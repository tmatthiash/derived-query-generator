import { ColumnList } from "./ColumnList";
import { mount } from "@cypress/react";

describe("Columnlist", () => {
  beforeEach(() => {
    mount(<ColumnList />);
  });

  it("should have the correct number of dropdown items", () => {
    cy.get(".MuiSelect-select").click();
    cy.get("li").should("have.length", 5);
  });

  it("varchar list should have correct count", () => {
    cy.get("input[type=text]").first().type("firstName");
    cy.get(".MuiSelect-select").click();
    cy.contains("VarChar").click();
    cy.contains("Add To List").click();
    cy.get(".MuiSelect-select").eq(1).click();
    cy.get("li").should("have.length", 9);
  });

  it("boolean list should have correct count", () => {
    cy.get("input[type=text]").first().type("isActive");
    cy.get(".MuiSelect-select").click();
    cy.contains("Boolean").click();
    cy.contains("Add To List").click();
    cy.get(".MuiSelect-select").eq(1).click();
    cy.get("li").should("have.length", 4);
  });

  it("integer list should have correct count", () => {
    cy.get("input[type=text]").first().type("count");
    cy.get(".MuiSelect-select").click();
    cy.contains("Integer").click();
    cy.contains("Add To List").click();
    cy.get(".MuiSelect-select").eq(1).click();
    cy.get("li").should("have.length", 7);
  });

  it("date list should have correct count", () => {
    cy.get("input[type=text]").first().type("start date");
    cy.get(".MuiSelect-select").click();
    cy.contains("Date").click();
    cy.contains("Add To List").click();
    cy.get(".MuiSelect-select").eq(1).click();
    cy.get("li").should("have.length", 6);
  });

  it("collection list should have correct count", () => {
    cy.get("input[type=text]").first().type("nameList");
    cy.get(".MuiSelect-select").click();
    cy.contains("Collection").click();
    cy.contains("Add To List").click();
    cy.get(".MuiSelect-select").eq(1).click();
    cy.get("li").should("have.length", 2);
  });
});
