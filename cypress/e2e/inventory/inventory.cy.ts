// @ts-check
///<reference types ="cypress" />
// import 'cypress-map'
import { LoginPage } from '@support/pages/login.page'
import { inventoryItem } from '@support/pages/inventory-items.page'

import { LoginPage } from '@support/pages/login.page';
//@ts-ignore
chai.use(require('chai-sorted'))


interface itemInventory {
  item: string
  name: string
  desc: string
  price: string
}

describe("Confirm Item Text Details", () => {
  /**
   * @type {{username: string, password: string}}
   */

  const user = Cypress.env('users').standard
  if(!user){
    throw new Error('Missing Standard user')
  }

  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

    it("Inventory in typescript", () => {
      cy.fixture('inventory-list.json').then((items: itemInventory[]) => {
        items.forEach((item: itemInventory) => {
          cy.log(`checking item ${item.name}`)
          cy.contains('.inventory_item', item.name).within(() => {
            cy.screenshot();
            cy.contains('.inventory_item_name', item.name);
            cy.contains('.inventory_item_desc', item.desc);
            cy.contains('.inventory_item_price', item.price);
          });
        })
      })


      
    })

    it("Inventory in typescript", () => {
      cy.fixture('inventory-list.json').then((items: itemInventory[]) => {
        items.forEach((item: itemInventory) => {
          cy.log(`checking item ${item.name}`)
          cy.contains('.inventory_item', item.name).within(() => {
            cy.screenshot();
            cy.contains('.inventory_item_name', item.name);
            cy.contains('.inventory_item_desc', item.desc);
            cy.contains('.inventory_item_price', item.price);
          });
        })
      })
    })


})