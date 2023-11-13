const loginlocators = require('../pages/login_page_locators.json')
const login = require("../data/logindata.json")
class loginPage{
    provideLoginInformation(){
        cy.xpath(loginlocators.email).type(login.email)
        cy.xpath(loginlocators.password).type(login.password)
        cy.contains('button', 'Login').click();
        cy.wait(4000)
        }
}export default loginPage