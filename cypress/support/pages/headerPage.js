export class HeaderPage {

    verificarUsuario(usuario) {
        cy.get(`[id^="user_${usuario}_"]`);
    };
};