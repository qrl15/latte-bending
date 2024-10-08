//@ts-check

///<reference types = "cypress" />

import { LoginInfo } from "@support/pages";
import { LoginPage } from "@support/pages/login.page";
import { inventoryItem } from "@support/pages/inventory-items.page";
import inventory from '@fixtures/inventory-list.json'
import { CheckoutPage } from "@support/pages/checkout.page"; 

describe('Perf Glitch', () =>{

    const user: LoginInfo = Cypress.env('users').standard
    if(!user){    throw new Error('Missing Standard User')}

    
        it('works for performance glitch user', {viewportHeight: 1200}, () => {
            LoginPage.login(user.username, user.password)
            cy.visit('/cart.html')
            inventoryItem.getCartBadge().should('not.exist')
            cy.get('[data-test="checkout"]').should('be.visible').and('be.disabled')
        })
    
    
    })