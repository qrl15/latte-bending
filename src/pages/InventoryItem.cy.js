import InventoryItem from './InventoryItem'
import { InventoryData } from '../utils/InventoryData'
import { inventoryItem } from '../../cypress/support/pages/inventory-items.page'


describe('InventoryItem', () => {

  const id = Cypress._.random(0, InventoryData.length - 1)
  beforeEach(()=> {
    cy.mountWithRouter(<InventoryItem search={'id=' +id} />)
  })

  it('shows an item', () => {
    const item = InventoryData[id]
    cy.get('.inventory_details_desc_container').within(() => {
      cy.contains('.inventory_details_name', item.name)
      cy.contains('.inventory_details_desc', item.desc)
      cy.contains('.inventory_details_price', '$' + item.price)
    })
  })

   it("Inventory Item adds and remove item", { viewportHeight: 1000 }, () => {

    cy.contains('button', 'Add to cart').click()
    inventoryItem.getCartBadge().should('be.visible').and('have.text', 2).pause()
    cy.contains('button', 'Remove').click()
    inventoryItem.getCartBadge().should('not.exist')
   })

   it.only("stores the cart items in the local storage (cy.then)", () => {
    cy.contains('button', 'Add to cart').click()
      // get the "cart-contents" from the local storage
    // and verify it contains an array with just number 1 inside
    .then(() => {
      expect(localStorage.getItem('cart-contents')).to.equal('[1]')
    })
      // find the button with text "Remove" and click on it
      cy.contains('button', 'Remove').click()
      .then(() => {
        expect(localStorage.getItem('cart-contents')).to.equal('[]')
      })

   })

   it.only('stores the cart items in the local storage (cy.should)', () => {
    cy.contains('button', 'Add to cart').click()
    .should(() => {
      expect(localStorage.getItem('cart-contents')).to.equal('[1]')
    })

    cy.contains('button', 'Remove').click()
    .should(() => {
      expect(localStorage.getItem('cart-contents')).to.equal('[]')
    })
   })


})


