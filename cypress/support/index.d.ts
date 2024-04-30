/// <reference types="cypress" />
declare namespace Cypress {
    interface Chainable {
      /**
       * Fill the current form (the parent subject)
       * with the given values. The argument is an object
       * with the keys being selectors and values being the strings
       * to type into the input fields.
       * @example
       *  cy.get('form').fillForm({ '#name': 'Joe' }).submit()
       */
      fillForm(selectorsValues: object): Chainable<JQuery<HTMLFormElement>>

    /**
     * Returns elements that have "data-test" attribute with the given value
     * @example
     *  getByTest('checkout').should('be.visible')
     */
      getByTest(testId: string): Chainable<JQuery<HTMLElement>>
    }
  }