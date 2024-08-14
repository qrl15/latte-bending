/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable <Subject = any> {
    /**
     * Fill the current form (the parent subject)
@@ -10,12 +11,37 @@ declare namespace Cypress {
     *  cy.get('form').fillForm({ '#name': 'Joe' }).submit()
     */
    fillForm<T extends Record<string, string>>(selectorsValues: T): Chainable<Subject>;

  /**
   * Returns elements that have "data-test" attribute with the given value
   * @example
   *  getByTest('checkout').should('be.visible')
   */
    getByTest(testId: string): Chainable<Subject>;
  }
}