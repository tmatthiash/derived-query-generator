/// <reference types="cypress" />

describe('VarChar Test', () => {
    it('Visits the website', () => {
      cy.visit('http://localhost:3000')
    })

    it('Fills in the column name', () => {
        cy.get('input[type=text]').first().type('firstName');
    })

    it('Sets the type to varchar', () => {
        cy.get('.MuiSelect-select').click();
        cy.contains('VarChar').click();
    })

    it('Adds to list', () => {
        cy.contains('Add To List').click();
    })

    it('Sets the query type to is/equals', () => {
        cy.get('.MuiSelect-select').eq(1).click();
        cy.contains('Is / Equals').click();
    })

    it('Should have the correct query in the query area', () => {
        cy.contains('findByFirstNameIsIgnoreCase(String firstName)').should('exist');
    })
  })
