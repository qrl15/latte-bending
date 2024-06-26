///<reference types ="cypress" />

import { LoginInfo } from '@support/pages'
import { LoginPage } from '@support/pages/login.page'
//@ts-ignore
chai.use(require('chai-sorted'))





describe("Locked out user", () => {
  beforeEach(() => { 
    cy.visit('/')

  })
  const user: LoginInfo = Cypress.env('users').lockedout
  if(!user){
    throw new Error('Missing the Lockedout user')
  }

  it.only('Lockout user REFACTOR', () => {
    cy.visit('/')
    LoginPage.getUsername().type(user.username)
    LoginPage.getPassword().type(user.password)
    LoginPage.noErrors()

    LoginPage.getLogin().click()
    cy.log('**shows errors**')
    LoginPage.getUsername().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')
    cy.location('pathname').should('equal', '/')
    // confirm there is an error message
    // and click its "close" button after 1 second delay
    // https://on.cypress.io/contains
    // https://on.cypress.io/find
    // https://on.cypress.io/wait
    LoginPage.getError()
      .should('include.text', 'locked out')
      .and('be.visible')
      // wait 1 second for clarity
      .wait(1000)
      .find('button.error-button')
      .click()
    // confirm the errors go away, but the input fields are not cleared
    LoginPage.noErrors()
    LoginPage.getUsername().should('have.value', user.username)
    LoginPage.getPassword().should('have.value', user.password)

  })

  it("locked_out_user test validation", () => {
    LoginPage.typeUsername('locked_out_user')
    LoginPage.typePassword('secret_sauce')
    cy.log("initially there should be no errors")
    cy.contains('[data-test=error]', 'locked out').should('not.exist')
    cy.get('[data-test="username"]').should('not.have.class', 'error')
    cy.get('[data-test="password"]').should('not.have.class', 'error')

    LoginPage.submitLogin()

    cy.log("confirm the page shows errors and stays on login URL")
    cy.get('[data-test="username"]').should('have.class', 'error')
    cy.get('[data-test="password"]').should('have.class', 'error')
    cy.contains('[data-test="error"]', 'locked out').should('be.visible')
    cy.location('pathname').should('equal','/')

    cy.contains('[data-test=error]', 'locked out')
      .should('be.visible')
      .wait(1000)
      .find('button.error-button')
      .click()

    cy.log("confirm the errors go away, but the input fields are not cleared")
    cy.contains('[data-test=error]', 'locked out').should('not.exist')
    cy.get('[data-test="username"]').should('not.have.class', 'error').and('have.value', 'locked_out_user')
    cy.get('[data-test="password"]').should('not.have.class', 'error').and('have.value', 'secret_sauce')
  })

  it("REFACTOR locked_out_user test validation", () => {
    cy.log("initially there should be no errors")
    LoginPage.noErrors()
    LoginPage.submitLogin()
    cy.log("confirm the page shows errors and stays on login URL")
    LoginPage.locationCheck('/');
    LoginPage.getUsername().should('have.class', 'error');
    LoginPage.getPassword().should('have.class', 'error')
    LoginPage.getError()
      .should('include.text', 'locked out')
      .should('be.visible')
      .find('button.error-button')
      .click()
    cy.log("confirm the errors go away, but the input fields are not cleared")
    LoginPage.noErrors()
    LoginPage.getUsername().should('have.value', 'locked_out_user')
    LoginPage.getPassword().should('have.value', 'secret_sauce')
  })


  it("Anonymouse User", () => {
    // confirm we are on root page
    LoginPage.locationCheck('/');

    // https://on.cypress.io/location
    cy.visit("/inventory.html")
    // confirm the page shows an error
    LoginPage.getPassword().should('have.class', 'error')
    LoginPage.getUsername().should('have.class', 'error')
    // confirm the error message includes the page name
    LoginPage.getError()
      .should('be.visible')
      .and('include.text', '/inventory.html')
      .find('button.error-button').click()
    // https://on.cypress.io/contains
    // confirm the username and the password fields
    // have the "error" CSS class included
  })

  it("shows an error for empty password field", () => {
    LoginPage.getPassword().type('secret_sauce')
    LoginPage.submitLogin()
    LoginPage.getUsername().should('have.class', 'error')

  })

  it("shows an error for empty username field", () => {

    LoginPage.submitLogin()
    LoginPage.showsError('Epic sadface: Username is required')

  })

})