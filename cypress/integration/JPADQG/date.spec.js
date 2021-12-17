/// <reference types="cypress" />

describe('Date Test', () => {
    it('Visits the website', () => {
      cy.visit('http://localhost:3000')
    })

    it('Fills in the column name', () => {
        cy.get('input[type=text]').first().type('signUpDate');
    })

    it('Sets the type to Integer', () => {
        cy.get('.MuiSelect-select').click();
        cy.contains('Date').click();
    })

    it('Adds to list', () => {
        cy.contains('Add To List').click();
    })

    it('Sets the query type to is/equals', () => {
        cy.get('.MuiSelect-select').eq(1).click();
        cy.contains('Is Between').click();
    })

    it('Should have the correct query in the query area', () => {
        cy.contains('findBySignUpDateBetween(Date startSignUpDate, Date endSignUpDate)').should('exist');
    })
  })
