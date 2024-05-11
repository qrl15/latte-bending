import Button from './Button'

it('shows a button', () => {
  cy.mount(<Button label="Test button" />)
  cy.contains('button', 'Test button')
})

it('calls the click prop', () => {
    cy.mount(<Button label="Test button" onClick={(cy.stub().as('click'))} />)

    cy.contains('button', 'Test button').click()
    cy.get('@click').should('have.been.calledOnce')
})

it('does not click the disabled button', () => {

    cy.mount(<Button label="disabled" disabled onClick={cy.stub().as('click')}  />)

    cy.contains('button', 'disabled')
    .should('be.disabled')
    .and('have.css', 'cursor', 'not-allowed')
    .click({force: true})
    

    cy.get('@click').should('not.be.called')
})