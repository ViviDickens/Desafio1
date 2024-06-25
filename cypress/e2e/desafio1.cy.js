import { LoginPage } from "../support/pages/loginPage";
import { HeaderPage } from "../support/pages/headerPage";
import { OnlineShopPage } from "../support/pages/onlineShopPage";

const loginPage = new LoginPage();
const headerPage = new HeaderPage();
const onlineShopPage = new OnlineShopPage();

describe('Prueba de compra', () => {

    beforeEach('Iniciar sesión y verificar usuario', () => {
        cy.visit('');
        cy.get('#registertoggle').dblclick();
        loginPage.login(Cypress.env('usuario'), Cypress.env('contraseña'));
        headerPage.verificarUsuario(Cypress.env('usuario'));
    });

    it('add new product, search and delete', () => {

        const productName = 'Sweater negro';
        const productPrice = '25,35';
        const productCard = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr0JxegsMPvc11HiyhgdFye3Od_NkhKcXDJQ&s';
        const productID = '18007';

        //Dirigirse a Online Shop
        cy.get('#onlineshoplink').click();

        //Completar form de agregar producto y verificación de campos
        cy.get(onlineShopPage.addproductButton).click();
        cy.get(onlineShopPage.productnameInput).type(productName);
        cy.get(onlineShopPage.productnameInput).should('have.value', productName);
        cy.get(onlineShopPage.productpriceInput).type(productPrice);
        cy.get(onlineShopPage.productpriceInput).should('have.value', productPrice);
        cy.get(onlineShopPage.productcardInput).type(productCard);
        cy.get(onlineShopPage.productcardInput).should('have.value', productCard);
        cy.get(onlineShopPage.productIDInput).type(productID);
        cy.get(onlineShopPage.productIDInput).should('have.value', productID);
        cy.get(onlineShopPage.createproductButton).click();
        cy.get(onlineShopPage.createproductButton).should('not.exist');

        //Alerta de producto agregado y verificaciones
        cy.contains('p', `${productName} has been added`).should('be.visible');
        cy.get(onlineShopPage.closemodalButton).click();
        cy.get(onlineShopPage.closemodalButton).should('not.exist');

        //Buscar el producto por ID
        cy.get('[data-cy="search-type"]').select('ID');
        cy.get('[data-cy="search-bar"]').type(`${productID}{enter}`);
        cy.get('[data-cy="search-bar"]').clear();


        //Eliminar el producto y verificaciones
        onlineShopPage.deleteProduct(productID);
        cy.contains('p', `Are you sure you want to delete ${productName}?`).should('be.visible');
        cy.get(onlineShopPage.deleteproductModal).click();
        cy.contains('p', `${productName} has been deleted`).should('be.visible');
        cy.get(onlineShopPage.closemodalButton).click();

        //Buscar el producto eliminado
        cy.get('[data-cy="search-type"]').select('ID');
        cy.get('[data-cy="search-bar"]').type(`${productID}{enter}`);

        //Verificar que el producto ya no existe
        cy.get(`[data-cy="product-${productID}"]`).should('not.exist');

    })
});