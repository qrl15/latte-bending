// @ts-check
///<reference types="cypress" />

import { LoginPage } from './login.page'
import { inventoryItem } from './inventory-items.page'
import { LoginInfo } from '.'

//@ts-ignore
chai.use(require('chai-sorted'))
describe('template spec', { viewportHeight: 1200 }, () => {


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
      // cy.get('.inventory_item:contains("Remove")').should('have.length', 1).click()
      cy.get('.inventory_item').contains("Remove").should('have.length', 1).click()
  })

  it('shows the added items in order they were added', {viewportHeight: 1200}, () => {
    const items = [
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Onesie']
    
    //Add each item to cart using the inventoryPage Object

    items.forEach(inventoryItem.addItem)
    
    // confirm the cart badge shows the right number of items
      // then click on it
    inventoryItem.getCartBadge()
      .should('have.text', items.length)
      .scrollIntoView()
      .click()
  
    cy.location('pathname').should('equal', '/cart.html')
      // confirm the cart items list has the right number of elements
    cy.get('.cart_list .cart_item').should('have.length', items.length)
    // iterate over the items
    items.forEach((itemName, k) => {
      cy.get('.cart_list .cart_item').eq(k).within(() => {
        cy.contains('.inventory_item_name', itemName)
        cy.contains('.cart_quantity', 1)
      })
    })
  })

  it('Remove items from the cart', {viewportHeight: 1200}, () => {
    inventoryItem.addItem('Sauce Labs Bike Light')
    inventoryItem.addItem('Sauce Labs Bolt T-Shirt')

    inventoryItem.getCartBadge().should('have.text', 2).click()
    cy.log('**we are on the cart page**')
    cy.location('pathname').should('equal', '/cart.html')

    cy.get('.cart_list .cart_item').should('have.length', 2)
    cy.contains('.cart_list .cart_item', 'Bike Light')
      .contains('button', 'Remove').click()

    cy.get('.cart_list .cart_item').should('have.length', 1).contains('Bolt T-Shirt')

    inventoryItem.getCartBadge().should('have.length', 1)
  })

})