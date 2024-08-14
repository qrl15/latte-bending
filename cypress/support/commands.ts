// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// @ts-ignore
//static Approach
// Cypress.Commands.add('fillForm', { prevSubject: 'element' },  ($form, firstName, lastName, postalCode) => {
//   cy.wrap($form).as('formElement').within(() =>{
//     cy.get('#first-name').type(firstName)
//     cy.get('#last-name').type(lastName)
//     cy.get('#postal-code').type(postalCode)
//   }).end()

//   return cy.get('@formElement')
// })

<<<<<<< HEAD
Cypress.Commands.add('fillForm', { prevSubject: 'element'}, (element, selectorsValues) => {
  cy.wrap(element).within(() => {
    Object.entries(selectorsValues).forEach(([selector, value]: [string, string]) =>{
      cy.get(selector).type(value);
      cy.get(selector).should('have.value', value);
    })
  })
})

=======
Cypress.Commands.add('fillForm',
  // @ts-ignore
  { prevSubject: 'element'}, ($form, inputs) => {
    cy.wrap($form, { log: false }).within(() => {
      // iterate over the input fields
      // and type into each selector (key) the value
      Cypress._.forEach(inputs, (value, selector) => {
        cy.get(selector).type(value)

        // confirm the input has been set correctly
        cy.get(selector).should('have.value', value)
      })
    })
  },
)

Cypress.Commands.add('getByTest', (testId) => {
  const log = Cypress.log({name: 'getByTest', message: testId})
  cy.get(`[data-test="${testId}"]`)
})
>>>>>>> 4bfc2a4d6a8ca8e884583907c8be26a1bd2a8a64
