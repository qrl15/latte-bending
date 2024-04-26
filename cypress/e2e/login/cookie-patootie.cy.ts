// @ts-check
///<reference types="cypress" />
//@ts-ignore
chai.use(require('chai-sorted'));
import 'cypress-data-session';

/**
 * Test Isolation change where the test don;t change the state and the second
 * after that can just continue
 */
describe('Example Cypress', {testIsolation: false}, () => {


  // beforeEach(() => {
  //   cy.session('user session', () => {

  //     cy.visit('/')
  //     cy.get('[data-test="username"]').type('standard_user');
  //     cy.get('[data-test="password"]').type('secret_sauce');
  //     cy.get('[data-test="login-button"]').click();

  //   })
  //     cy.visit('/inventory.html')
  // })

  before(() => {
      cy.visit('/')
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();


  })

  function sortByPriceOrName(order: string) {
    expect(order, 'sort order').to.be.oneOf(['lohi', 'hilo', 'az', 'za']);
    cy.get('[data-test="product_sort_container"]').select(order);
  }

  function getPrices() {
    return cy
      .get('.inventory_item_price')
      .then($prices => {
        // Extract the prices into an array of numbers
        return $prices.toArray().map(el => parseFloat(el.innerText.substring(1)));
      });
  }

  function getNames() {
    return cy
      .get('.inventory_item_name')
      .then($names => {
        // Extract the names into an array of strings
        return $names.toArray().map(el => el.innerText);
      });
  }

  it("Sorted Prices Ascending", () => {
    sortByPriceOrName('lohi');
    getPrices().should('be.ascending');
  });

  it("Sorted Prices Descending", () => {
    sortByPriceOrName('hilo');
    getPrices().should('be.descending');
  });

  it("sorted by name from A to Z", () => {
    sortByPriceOrName('az');
    getNames().should('be.ascending');
  });

  it("sorted by name from Z to A", () => {
    sortByPriceOrName('za');
    getNames().should('be.descending');
  });
});

