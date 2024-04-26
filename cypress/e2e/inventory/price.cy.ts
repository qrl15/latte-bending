
///<reference types="cypress" />
import 'cypress-map'


describe('Example Cypress Todo MVC Test', () => {
  it("Store Visit and price checks", () => {
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.get('.inventory_list').should('be.visible')
      .find('.inventory_item_price')
      .should('have.length.greaterThan', 3)
      
      // .then($list => Cypress._.map($list, 'innerText'))
      // .then(console.log)
      // .then((prices) => prices.map((s) => s.slice(1)))
      // .then(console.log)
      // .then((strings) => strings.map(Number))
      // .then(console.log)
      // .then((prices) => Cypress._.min(prices))
      // .should('equal', 7.99)

      .map('innerText')
      .print('strings %o')
      .mapInvoke('slice', 1)
      .print('without $ %o')
      .map(Number)
      .apply(Cypress._.min)
      .should('equal', 7.99)
  })
});