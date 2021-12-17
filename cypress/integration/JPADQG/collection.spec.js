/// <reference types="cypress" />

describe('VarChar Test', () => {
    it('Visits the website', () => {
      cy.visit('http://localhost:3000')
    })

    it('Fills in the column name', () => {
        cy.get('input[type=text]').first().type('itemList');
    })

    it('Sets the type to Integer', () => {
        cy.get('.MuiSelect-select').click();
        cy.contains('Collection').click();
    })

    it('Adds to list', () => {
        cy.contains('Add To List').click();
    })

    it('Sets the query type to is/equals', () => {
        cy.get('.MuiSelect-select').eq(1).click();
        cy.contains('Is In').click();
    })

    it('Should have the correct query in the query area', () => {
        cy.contains('findByFirstNameIn(Collection<firstName> firstName)').should('exist');
    })
  })
