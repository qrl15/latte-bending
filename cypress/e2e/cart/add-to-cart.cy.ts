// @ts-check
///<reference types="cypress" />
describe('PAGE OBJECT FOR THE INVENTORY PAGE', () => {
    /**
     * @type {{ username: string, password: string }}
     */

    const user = Cypress.env('users').standard;
    if(!user){
        throw new Error('Missing the standard user')
    }

    it('Add to cart refactor', { viewportHeight: 1200 }, () => {

    })
})
