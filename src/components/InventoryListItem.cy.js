import InventoryListItem from "./InventoryListItem";
import { InventoryData } from "../utils/InventoryData";
import { ShoppingCart } from "../utils/shopping-cart";



describe('Inventory List Items', () => {
    it('add an item to the cart', () => {
        const item = InventoryData[3]
        cy.mountWithRouter(<InventoryListItem {...item}/>)

        cy.get('.inventory_item').should('have.attr', 'data-itemid', 3)
        .contains('button', 'Add to cart')
        .click()


        cy.get('.inventory_item').contains('button', 'Remove').should('be.visible')
        cy.wrap(ShoppingCart).invoke('getCartContents').should('deep.equal', [3])
        cy.wrap(ShoppingCart).invoke('isItemInCart', 3).should('be.true')
    })
})