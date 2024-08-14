//@ts-check
///<reference types ="cypress" />


import { LoginPage } from '@support/pages/login.page'
import { inventoryItem } from '@support/pages/inventory-items.page'
import { InventoryData } from '../../../src/utils/InventoryData'
import { LoginInfo } from '@support/pages'
import inventory from '@fixtures/inventory-list.json'
import { CheckoutPage } from '@support/pages/checkout.page'

describe('Total', { viewportHeight: 1200 }, () => {

    const user: LoginInfo = Cypress.env('users').standard
    if(!user){
        throw new Error('Missing the standard user')
    }
    
    beforeEach(() => {
        LoginPage.login(user.username, user.password)
    })

    it('get total', { viewportHeight: 1200 }, () =>{
        const pickedItem = Cypress._.sampleSize(inventory, 0)
        const ids = Cypress._.map(pickedItem, 'id')
        window.localStorage.setItem('cart-contents', JSON.stringify(ids))
        cy.visit('/checkout-step-one.html')
    })

    it('Optimized Total', { viewportHeight: 1200 }, () => {
        //Access fixture JSON file
        cy.fixture('inventory-list.json').then((inventory) => {
            const pickedItem = Cypress._.sampleSize(inventory, 0)
            const ids = Cypress._.map(pickedItem, 'id')
           window.localStorage.setItem('cart-contents', JSON.stringify(ids))
            cy.visit('/checkout-step-one.html')
        })
    })

    it.only('shows the right total price', { viewportHeight: 1200 }, () => {
        // pick random 3 items from the InventoryData array
        // https://lodash.com/docs
        // Tip: I told you Lodash is a super neat library
        const pickedItems = Cypress._.sampleSize(InventoryData, 1)
        // grab the "id" property from each item in the picked items
        // Tip: I told you Lodash is a super neat library
        const ids = Cypress._.map(pickedItems, 'id')
        // set the ids in the local storage item "cart-contents"
        // Tip: local storage usually has stringified data
        window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    
        // visit the page checkout-step-one.html directly
        // skipping the inventory page
        // https://on.cypress.io/visit
        cy.visit('/checkout-step-one.html')
    
        // fill the check out form with values "Joe Smith 90210"
        // and click the "Continue" element after confirming
        // the "Continue" element has the right "value" attribute
        // https://on.cypress.io/within

        cy.get('.checkout_info_wrapper form')
        .find('input[type=submit]')
        .should('have.attr', 'value', 'Continue')

        // cy.get('.checkout_info_wrapper form').fillForm({
        //   '#first-name': 'Joe',
        //   '#last-name': 'Smith',
        //   '#postal-code': '90210',
        // }).submit()
      CheckoutPage.fillInformationForm().submit()

        // we should be on the checkout step two page
        // https://on.cypress.io/location
        cy.location('pathname').should('equal', '/checkout-step-two.html')
        // the overview page shows the expected number of picked items
        cy.get('.cart_list .cart_item').should('have.length', pickedItems.length)
        // grab the "price" property from each picked item
        // using Lodash method _.map
        const prices = Cypress._.map(pickedItems, 'price')
        // and sum the prices to compute the expected total price
        // using Lodash method _.sum
        const sum = Cypress._.sum(prices)
        // print the picked prices and the computed sum
        // to the Command Log for clarity
        cy.log(prices.join(' + ') + ' = ' + sum)
        // confirm the page shows the expected item total
        cy.contains('.summary_subtotal_label', '$' + sum)
      })

      it('shows the tax within limits', { viewportHeight: 1200 }, () => {
        // pick random 3 items from the InventoryData array
        // https://lodash.com/docs
        // Tip: I told you Lodash is a super neat library
        const pickedItems = Cypress._.sampleSize(InventoryData, 3)
        // grab the "id" property from each item in the picked items
        // Tip: I told you Lodash is a super neat library
        const ids = Cypress._.map(pickedItems, 'id')
        // set the ids in the local storage item "cart-contents"
        // Tip: local storage usually has stringified data
        window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    
        // visit the page checkout-step-one.html directly
        // skipping the inventory page
        // https://on.cypress.io/visit
        cy.visit('/checkout-step-one.html')
    
        // fill the check out form with values "Joe Smith 90210"
        // and click the "Continue" element after confirming
        // the "Continue" element has the right "value" attribute
        // https://on.cypress.io/within
        cy.get('.checkout_info_wrapper form').within(() => {
          cy.get('#first-name').type('Joe')
          cy.get('#last-name').type('Smith')
          cy.get('#postal-code').type('90210')
          cy.get('input[type=submit]')
            .should('have.attr', 'value', 'Continue')
            .click()
        })
        // we should be on the checkout step two page
        // https://on.cypress.io/location
        cy.location('pathname').should('equal', '/checkout-step-two.html')
        // the overview page shows the expected number of picked items
        cy.get('.cart_list .cart_item').should('have.length', pickedItems.length)
    
        // grab the "price" property from each picked item
        // using Lodash method _.map
        const prices = Cypress._.map(pickedItems, 'price')
        // and sum the prices to compute the expected total price
        // using Lodash method _.sum
        const sum = Cypress._.sum(prices)
        // print the picked prices and the computed sum
        // to the Command Log for clarity
        cy.log(prices.join(' + ') + ' = ' + sum)
        // calculate min and max reasonable tax: 5% and 10% of the order
        // note: we don't have to round the numbers
        // since we will use them in numerical assertion
        const minTax = sum * 0.05
        const maxTax = sum * 0.1
        // print the min and max tax to Command Log
        cy.log(`tax between $${minTax} and $${maxTax}`)
        // confirm the page shows the tax and the text $...X.YZ
        // can be converted into a number
        // and is between min and max tax amounts
        // Hint: https://glebbahmutov.com/cypress-examples/recipes/dollar-range.html
        cy.contains('.summary_tax_label', /\$\d+\.\d\d$/)
          // grab the element's text
          .invoke('text')
          // match the text using a regular expression with a named capture group "tax"
          .invoke('match', /\$(?<tax>\d+\.\d\d)$/)
          // from the regular expression match get its "groups" property
          // get the "tax" property, it should be a string
          .its('groups.tax')
          // convert the text to a number
          // https://on.cypress.io/then
          .then(Number)
          // and confirm the number is between min and max tax numbers

          .should('be.within', minTax, maxTax)
      })
})