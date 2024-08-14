/// <reference types="cypress" />
declare namespace Cypress {
<<<<<<< HEAD
    interface Chainable <Subject = any> {
      /**
       * Fill the current form (the parent subject)
       * with the given values. The argument is an object
       * with the keys being selectors and values being the strings
       * to type into the input fields.
       * @example
       *  cy.get('form').fillForm({ '#name': 'Joe' }).submit()
       */
      fillForm<T extends Record<string, string>>(selectorsValues: T): Chainable<Subject>;
=======
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
>>>>>>> 4bfc2a4d6a8ca8e884583907c8be26a1bd2a8a64

    /**
     * Returns elements that have "data-test" attribute with the given value
     * @example
     *  getByTest('checkout').should('be.visible')
     */
<<<<<<< HEAD
      getByTest(testId: string): Chainable<Subject>;
    }
  }
=======
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>

    /**
     * Returns an element that has "data-test" attribute and contains the given text
     * @example
     *  getByTest('checkout').should('be.visible')
     */
    containsTestId(testId: string, text: string): Chainable<JQuery<HTMLElement>>
  }
}
>>>>>>> 4bfc2a4d6a8ca8e884583907c8be26a1bd2a8a64
