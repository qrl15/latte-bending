<<<<<<< HEAD
//@ts-check

///<reference types = "cypress" />

import { LoginInfo } from "@support/pages";
import { LoginPage } from "@support/pages/login.page";
import { inventoryItem } from "@support/pages/inventory-items.page";
import inventory from '@fixtures/inventory-list.json'
import { CheckoutPage } from "@support/pages/checkout.page"; 



describe('Perf Glitch', () =>{

const user: LoginInfo = Cypress.env('users').glitchUser
const item = Cypress._.sample(inventory)

    it('works for performance glitch user', {viewportHeight: 1200, pageLoadTimeout: 3_000}, () => {
        LoginPage.login(user.username,  user.password)
        cy.visit('/inventory.html', { timeout: 3_000})
    
        inventoryItem.addItem(item!.name)
        cy.visit('/checkout-step-one.html')
    })


})
=======
// //@ts-check

// ///<reference types = "cypress" />

// import { LoginInfo } from "@support/pages";
// import { LoginPage } from "@support/pages/login.page";
// import { inventoryItem } from "@support/pages/inventory-items.page";
// import inventory from '@fixtures/inventory-list.json'
// import { CheckoutPage } from "@support/pages/checkout.page"; 



// describe('Perf Glitch', () =>{

// const user: LoginInfo = Cypress.env('users').glitchUser
// const item = Cypress._.sample(inventory)

//     it('works for performance glitch user', {viewportHeight: 1200, pageLoadTimeout: 3_000}, () => {
//         LoginPage.login(user.username,  user.password)
//         cy.visit('/inventory.html', { timeout: 3_000})
    
//         inventoryItem.addItem(item!.name)
//         cy.visit('/checkout-step-one.html')
//     })


// })
>>>>>>> 4bfc2a4d6a8ca8e884583907c8be26a1bd2a8a64
