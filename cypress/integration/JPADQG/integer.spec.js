/// <reference types="cypress" />

describe('Integer Test', () => {
    it('Visits the website', () => {
      cy.visit('http://localhost:3000')
    })

    it('Fills in the column name', () => {
        cy.get('input[type=text]').first().type('count');
    })

    it('Sets the type to Integer', () => {
        cy.get('.MuiSelect-select').click();
        cy.contains('Integer').click();
    })

    it('Adds to list', () => {
        cy.contains('Add To List').click();
    })

    it('Sets the query type to is/equals', () => {
        cy.get('.MuiSelect-select').eq(1).click();
        cy.contains('Is Less Than or Equal to').click();
    })

    it('Should have the correct query in the query area', () => {
        cy.contains('findByCountLessThanEqual(Integer count)').should('exist');
    })
  })
