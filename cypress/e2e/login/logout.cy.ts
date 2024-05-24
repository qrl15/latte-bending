///<reference types ="cypress" />

import { LoginPage } from '../../support/pages/login.page'
//@ts-ignore
chai.use(require('chai-sorted'))

describe("Session Logout", () => {

/**
 * @type {{username: string, password: string}}
 */
  const user = Cypress.env('users').standard  
  if(!user){
    throw new Error('Missing the standard user')
  }
  it("Log out ", () => {

    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html');
    cy.location('pathname').should('equal', '/inventory.html')
    cy.contains('button', 'Open Menu').click()
    cy.get('.bm-menu').should('be.visible')
      .contains('.menu-item', 'Logout').click()

      cy.visit('/inventory.html');
      LoginPage.showsError('Epic sadface: You can only access \'/inventory.html\' when you are logged in.')
  })

  


})