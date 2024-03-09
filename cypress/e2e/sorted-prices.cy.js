// // @ts-check
// ///<reference types = "cypress" />
// import 'cypress-map'

// chai.use(require('chai-sorted'))
// describe('Example Cypress', () => {
//   beforeEach(() => {
//     cy.visit('/')
//     cy.get('[data-test="username"]').type('standard_user');
//     cy.get('[data-test="password"]').type('secret_sauce');
//     cy.get('[data-test="login-button"]').click();
//   })

//   /**
//    * 
//    * @param {'lohi' | 'hilo' | 'az' | 'za'} order 
//    */

//   function sortByPriceOrName(order){
//     // confirm the argument value at runtime
//     expect(order, 'sort order').to.be.oneOf(['lohi','hilo', 'az', 'za'])
//     cy.get('[data-test="product_sort_container"]').select(order)
//   }

//   function getPrices() {
//     return cy
//       .get('.inventory_item_price').map('innerText')
//       .mapInvoke('slice', 1)
//       .map(Number)
//       .print('prices %o')
//   }

//   function getName(){
//     return cy
//       .get('.inventory_item_name').map('innerText')
//       .print('name %o')
//   }

//   it("Sorted Prices Ascending ", () => {
//     sortByPriceOrName('lohi')
//     getPrices().should('be.ascending')
//   })

//   it("Sorted Prices Descending ",() => {
//     sortByPriceOrName('hilo')
//     getPrices().should('be.descending')
//   })

//   it("sorted by name from A to Z", () => {
//     sortByPriceOrName('az')
//     getName().should('be.ascending');
//   })

//   it("sorted by name from z to A", () => {
//     sortByPriceOrName('za')
//     getName().should('be.descending');
//   })


// });

// @ts-check
///<reference types="cypress" />
//@ts-ignore
chai.use(require('chai-sorted'));
import 'cypress-data-session';

describe('Example Cypress', () => {

  beforeEach(() => {
    cy.dataSession({
      name: 'user session',
      setup(){
        cy.visit('/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.location('pathname')
          .should('equal', '/inventory.html')
        cy.getCookie('session-username').should('exist')
      },
      /**
       * Restores the session by setting a specific cookie value.
       * @param {Cypress.Cookie} userCookie - The user session cookie to set for session restoration.
       */
      recreate(userCookie){
        cy.setCookie('session-username', userCookie.value)
        cy.visit('/inventory.html')
      }
    });

    cy.location('pathname').should('equal', '/inventory.html')
  });
  /**
   * Sorts the products by price or name based on the specified order.
   * @param {string} order - Specifies the sorting order. Expected values are 'lohi' (low to high), 'hilo' (high to low), 'az' (alphabetical A-Z), or 'za' (alphabetical Z-A).
   */

  function sortByPriceOrName(order) {
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

