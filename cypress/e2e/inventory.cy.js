// @ts-check
///<reference types ="cypress" />
import 'cypress-map'
import items from '../fixtures/inventory-list.json'
//@ts-ignore
chai.use(require('chai-sorted'))



describe("Confirm Item Text Details", () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it("Inventory Item Details", () => {
    cy.screenshot()
    cy.fixture('inventory-list.json').then((list) => {
      /**
       * Iterates over each inventory item to check its details.
       * @param {{ name: string, desc: string, price: string }} item - The inventory item with its name, description, and price.
       */
      list.forEach((item) => {
        cy.log(`checking item ${item.name}`)
        cy.contains('.inventory_item', item.name).within(()=>{
          cy.screenshot()
          cy.contains('.inventory_item_name', item.name)
          cy.contains('.inventory_item_desc', item.desc)
          cy.contains('.inventory_item_price', item.price)
        })
      })
    })
  })


})