import Select from './Select'

it('Shows the select component', () => {
    const options = [
        {
            key: 'a to z',
            value: 'A to Z',
        },{
            key: 'z to a',
            value: 'Z to A',
        },
    ]

    const activeOption = 'a to z'
    const selectOption = cy.stub().as('selectOption')
    const select = (e) => selectOption(e.target.value)

    cy.mount(
        <Select
            options={options}
            activeOption={activeOption}
            testId="test-select"
            onChange={select}
            />
    )

    cy.get('select[data-test=test-select]').select('Z to A')
    cy.get('@selectOption').should('have.been.calledWith', 'z to a')
})