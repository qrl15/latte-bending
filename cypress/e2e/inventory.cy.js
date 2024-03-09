// @ts-check
///<reference types ="cypress" />
import 'cypress-map'

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