// @ts-check
///<reference types="cypress" />

import { LoginPage } from './login.page'
import { inventoryItem } from './inventory-items.page'
//@ts-ignore
chai.use(require('chai-sorted'))
describe('template spec', { viewportHeight: 1200 }, () => {

  /**
   * @type {{username: string, password: string}}
   */

  const user = Cypress.env('users').standard
  if(!user){
    throw new Error('Missing Standard user')
  }

  beforeEach(() => {
    LoginPage.setLogin(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })


  it('Adding product', {viewportHeight: 1200},() => {
    inventoryItem.getCartBadge().should('not.exist')

    inventoryItem.addItem('Sauce Labs Bike Light')
      cy.contains('.inventory_item', 'Sauce Labs Bike Light').within(() => {
        cy.contains('button', 'Add to cart').should('not.exist')
        cy.contains('button', 'Remove')
      })
      inventoryItem.getCartBadge().should('have.text', '1').scrollIntoView()
      cy.get('.inventory_item:contains("Remove")').should('have.length', 1).click()
  })



})