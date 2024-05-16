///<reference types ="cypress" />

import { LoginPage } from '../../support/pages/login.page'
//@ts-ignore
chai.use(require('chai-sorted'))



describe('Product', () => {
  /**
   * @type {{username: string, password: string}}
   */
  const user = Cypress.env('users').standard
  
  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })


  it('Product View', () => {
    const name = 'Sauce Labs Bolt T-Shirt'
    const price = '$15.99'
    cy.contains('.inventory_item', name).find('.inventory_item_label a').click()
// confirm we transition to the item's page
    cy.location('pathname').should('equal', '/inventory-item.html')
    // we do not know the item id, thus check
    // that the search parameters in the URL
    cy.location('search').should('match', /id=\d+/)
    cy.get('.inventory_item_container .inventory_details' )
      .should('be.visible')
      .within(() => {
        cy.contains('.inventory_details_name.large_size', name)
        cy.contains('.inventory_details_price', price)
        
      })
      // "Back to products" button
      cy.get('[data-test="back-to-products"]').click()
      cy.location('pathname').should('equal', '/inventory.html')
  })


  it('shows the item', () => {

    const name = 'Sauce Labs Fleece Jacket'
    const price = '$49.99'

    cy.contains('.inventory_item', name).should('have.attr', 'data-itemid')
    .should('be.a', 'string')
    .then((itemId) => {
      cy.contains('.inventory_item', name)
      .find('.inventory_item_label a')
      .should('have.attr', 'id', `item_${itemId}_title_link`)
      .click()

    })

    cy.get('.inventory_item_container .inventory_details')
    .should('be.visible')
    .within(() => {
      cy.contains('.inventory_details_name.large_size', name)
      cy.contains('.inventory_details_price', price)
    })

  })

  it('have unique ids', () => {
    cy.get('.inventory_item')
      .should('have.length.greaterThan', 3)
      .then($items => {
        // Use .map() to extract 'data-itemid' attributes from each item
        const ids = $items.map((index, htmlElement) => htmlElement.getAttribute('data-itemid')).get();
        // Print ids to the console for debugging
        console.log('ids', ids);
        // Check if all ids are unique
        const uniqueIds = [...new Set(ids)];
        expect(uniqueIds).to.have.length(ids.length);
      });
  });

  it('have unique ids LODASH', () => {
    // get all inventory items, there should be more than 3
    // https://on.cypress.io/get
    // https://on.cypress.io/should
    cy.get('.inventory_item')
      .should('have.length.greaterThan', 3)
      // from each element, get the attribute "data-itemid"
      // and confirm the ids are unique
      .invoke('toArray')
      .invoke('map', (el: any) => el.getAttribute('data-itemid'))
      .should((ids) => {
        const unique = Cypress._.uniq(ids)
        expect(unique).to.deep.equal(ids)
      })
  })

  it('ItemId extraction', () => {
    const name = 'Sauce Labs Fleece Jacket'
    const price = '$49.99'

    cy.contains('.inventory_item', name)
      .invoke('attr', 'data-itemid')
      .should('be.a', 'string')
      .then((itemId) => {

      })
  })


})