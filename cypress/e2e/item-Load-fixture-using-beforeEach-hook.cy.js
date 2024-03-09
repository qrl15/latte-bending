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

  it("Item Details", () => {
    cy.contains('.inventory_item', 'Sauce Labs Bike Light').within(() => {
      cy.contains('.inventory_item_name', 'Sauce Labs Bike Light')
      cy.contains('.inventory_item_desc',"A red light isn't the desired state in testing but it sure helps when riding your bike at night.")
      cy.contains('.inventory_item_price', '$9.99')
    })
  })

  it('Very Item Details from Fixture', () => {
    cy.fixture('inventory-list.json').then((items) => {
      items.forEach((item) => { 
        cy.contains('.inventory_item', item.name).within(() => {
          cy.contains('.inventory_item_name', item.name)
          cy.contains('.inventory_item_desc', item.desc)
          cy.contains('.inventory_item_price', item.price)
        })
      })
    })
  })


})