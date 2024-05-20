import CartItem from './CartItem'
import { InventoryData } from '../utils/InventoryData'
import './InventoryListItem.css'

describe('CartItem', () => {
    it('shows a cart Item', () => {
        const item = InventoryData[2]
        cy.mountWithRouter(<CartItem item={item} />)

        cy.get('.cart_item').within(() => {
            cy.contains('.cart_quantity', 1)
            cy.get('.inventory_item_name').should('have.css', 'color', 'rgb(226, 35, 26)')
        })
    })

    it('Removes a cart Item', () => {
        const item = InventoryData[2]
        cy.mountWithRouter(<CartItem item={item} showButton={true} />)
        cy.get('.cart_item').contains('button', 'Remove').click()
        // the cart item should be gone
        cy.get('.cart_item').should('not.exist')
        // and an element with class "removed_cart_item" should be there instead
        cy.get('.removed_cart_item')
    })

})
