import InventoryItem from './InventoryItem'
import { InventoryData } from '../utils/InventoryData'

describe('InventoryItem', () => {
  it('shows an item', () => {
    const id = Cypress._.random(0, InventoryData.length - 1)
    cy.mountWithRouter(<InventoryItem search={'id=' + id} />)
    const item = InventoryData[id]

    cy.get('.inventory_details_desc_container').within(() => {
      cy.contains('.inventory_details_name', item.name)
      cy.contains('.inventory_details_desc', item.desc)
      cy.contains('.inventory_details_price', '$' + item.price)
    })
  })
})


