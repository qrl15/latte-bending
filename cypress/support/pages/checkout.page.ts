export const CheckoutPage = {


/**
   * Fills the checkout form with provided or default values.
   * @param firstName First name, default "Joe"
   * @param lastName Last name, default "Smith"
   * @param zipCode Zip code, default "90210"
   * @example
   *  import { CheckoutPage } from './checkout.page'
   *  CheckoutPage.fillInformationForm().submit()
   * @example
   *  // fill with your own information
   *  CheckoutPage
   *    .fillInformationForm('Mary', 'Brave', '01380')
   *    .submit()
   */

fillInformationForm(firstName = 'Earl', lastName = 'Smith',zipCode = '90210',){

    return cy.get('.checkout_info_wrapper form').fillForm({
        '#first-name': firstName,
        '#last-name': lastName,
        '#postal-code': zipCode,
    })
    },

}