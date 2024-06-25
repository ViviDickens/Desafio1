export class LoginPage {

    constructor() {
        this.userInput = '#user'
        this.passInput = '#pass'
        this.iniciaSessionButton = '#submitForm'
    }

    escibirUsuario(usuario) {
        cy.get(this.userInput).type(usuario);
    };

    escibirContraseña(contraseña) {
        cy.get(this.passInput).type(contraseña);
    };

    clickIniciaSession() {
        cy.get('#submitForm').click();
    };

    login(usuario, contraseña) {
        cy.get(this.userInput).type(usuario);
        cy.get(this.passInput).type(contraseña);
        cy.get(this.iniciaSessionButton).click();
    };
};