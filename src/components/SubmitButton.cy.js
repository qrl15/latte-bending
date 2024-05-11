import SubmitButton from './SubmitButton'


it('shows the submit button', () => {
    cy.mount(
        <SubmitButton
            value="Continue"
            customClass="submit-button"
            testId="submit-it"/>,
    )

    cy.contains('input.submit-button', 'Continue')
    .should('have.value', 'Continue')
    .and('have.attr', 'data-test', 'submit-it')
    .and('have.attr', 'id', 'submit-it')
    .and('have.attr', 'name', 'submit-it')
})