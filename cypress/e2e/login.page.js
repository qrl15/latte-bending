// @ts-check
///<reference types = "cypress" />

export const LoginPage = {
    getUsername() {
        return cy.get('[data-test="username"]')
    },
    getPassword() {
        return cy.get('[data-test="password"]')
    },
    getError(){
        return cy.get('[data-test=error]')
    },
    noErrors(){
        LoginPage.getError().should('not.exist')
        LoginPage.getUsername().should('not.have.class', 'error')
        LoginPage.getPassword().should('not.have.class', 'error')
    },
    /**
     * Types the username into the username input field.
     * @param {string} username - Username to be typed.
     */
    typeUsername(username){
        this.getUsername().type(username)
    },
    /**
     * Types the username into the username input field.
     * @param {string} password - Username to be typed.
     */
    typePassword(password){
        this.getPassword().type(password)
    },
    submitLogin(){
        cy.get('[data-test="login-button"]').click()

    },
    /**
     * Checks if the current location matches the expected one.
     * @param {string} location - Expected pathname to check against the current location.
     */
    locationCheck(location){
       return cy.location('pathname').then((pathname) => {
        expect(pathname).to.equal(location);
      });

    },
    /**
     * Verifies that an error message is shown and the username and password fields are marked with an error.
     * @param {string} text - The error message text to check for visibility.
     */
    showsError(text){
        cy.contains('[data-test=error]', text).should('be.visible')
        LoginPage.getUsername().should('have.class', 'error')
        LoginPage.getPassword().should('have.class', 'error')
    },
    /**
     * Logs in the user using the provided username and password, checking for successful navigation to a specific page.
     * This function leverages Cypress's session command to improve test efficiency by reusing the session.
     * @param {string} username - Username for login.
     * @param {string} password - Password for login.
     */
    setLogin(username, password){
        cy.session(`user ${username} login`, () => {
            cy.log('**login**')
            cy.visit('/')
            LoginPage.getUsername().type(username)
            LoginPage.getPassword().type(password, {log: false})
            LoginPage.submitLogin()
            cy.location('pathname').should('equal', '/inventory.html')
        })
    }
}