import InventoryItem from './InventoryItem'

describe('InventoryItem', () => {
  it('shows an item', () => {
    // what do you see when you try to mount the component?
    cy.mount(<InventoryItem />)
  })
})