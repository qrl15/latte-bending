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

    typeUsername(username: string){
        this.getUsername().type(username)
    },

    typePassword(password: string){
        this.getPassword().type(password)
    },
    submitLogin(){
        cy.get('[data-test="login-button"]').click()

    },
    locationCheck(location: string){
       return cy.location('pathname').then((pathname) => {
        expect(pathname).to.equal(location);
      });

    },

    showsError(text: string){
        cy.contains('[data-test=error]', text).should('be.visible')
        LoginPage.getUsername().should('have.class', 'error')
        LoginPage.getPassword().should('have.class', 'error')
    },

    setLogin(username: string, password: string){
        cy.session(`user ${username} login`, () => {
            cy.log('**login**')
            cy.visit('/')
            LoginPage.getUsername().type(username)
            LoginPage.getPassword().type(password, {log: false})
            LoginPage.submitLogin()
            cy.location('pathname').should('equal', '/inventory.html')
        },{
            validate() {
                cy.log('**validate login session**')
                cy.getCookie('session-username').then(Boolean)
              },
        }
        )
    }
}