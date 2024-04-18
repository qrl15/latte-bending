// @ts-check
///<reference types="cypress" />

import { LoginPage } from './login.page'
import { inventoryItem } from './inventory-items.page'
import { LoginInfo, justText } from '.'
import inventory from '../fixtures/inventory-list.json'

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

  it('shows the added items in order they were added using MAPS', {viewportHeight: 1200}, () => {
    const items = [
      'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Onesie'
    ]
    const ids = items.map((name) => Cypress._.find(inventory, {name})!.id)
    items.forEach(inventoryItem.addItem)

    cy.log('**added all items to cart**')

    inventoryItem.getCartBadge().should('have.text', items.length)
      .scrollIntoView()
      .click()
      cy.location('pathname').should('equal', '/cart.html')
      cy.get('.cart_list .cart_item').should('have.length', items.length)
      cy.log('**shows each item in order**')

      items.forEach((itemName, k) => {
        cy.get('.cart_list .cart_item').eq(k).within(() => {
          cy.contains('.inventory_item_name', itemName)
          cy.contains('.cart_quantity',1 )
        })
      })

      cy.window()
      .its('localStorage')
      .invoke('getItem', 'cart-contents')
      .then((item) => {
        if (item) {
          return JSON.parse(item);
        }
        // Return a default value or throw an error if the item doesn't exist
        // Depending on your test's requirements, you might want to return an empty array, for example
        return []; // or throw new Error('Cart contents not found');
      })
      .should('deep.equal', ids); // Compare with the expected ids
    
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

  /**
   * directly manipulating localStorage for setting up cart contents is more efficient for tests 
   * focused on verifying the correct display of cart items because it simplifies the test setup,
   *  reduces execution time, and isolates the functionality being tested. This method allows for a 
   * focused verification of the cart page's ability to correctly interpret and display cart contents 
   * as stored in localStorage, without the overhead of simulating the complete user journey to add 
   * items to the cart.
   */
  it('shows the cart items', { viewportHeight: 1200 }, () => {
    const items = [
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Backpack',
      'Sauce Labs Fleece Jacket'
    ]
    // find an id for each inventory item by name
    // and store the ids in the array "ids"
    // const ids = ...
    const ids = items.map((name) => Cypress._.find(inventory, { name })!.id)
    // set the ids in the local storage item "cart-contents"
    // Tip: local storage usually has stringified data
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    // visit the cart page
    // https://on.cypress.io/visit
    cy.visit('/cart.html')
    // confirm each item name is present
    // confirm the cart items list has the right number of elements
    cy.get('.cart_list .cart_item').should('have.length', items.length)
    cy.log('**shows each item in order**')
    // iterate over the items
    items.forEach((itemName, k) => {
      // confirm each itm is at the right place
      // on the page in the list of items
      // https://on.cypress.io/get
      // https://on.cypress.io/eq
      cy.get('.cart_list .cart_item')
        .eq(k)
        .within(() => {
          // and confirm that within the item the name
          // is correct and the quantity is 1
          cy.contains('.inventory_item_name', itemName)
          cy.contains('.cart_quantity', 1)
        })
    })
  })

})