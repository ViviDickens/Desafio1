export class OnlineShopPage {
    constructor() {
        this.addproductButton = '[data-cy="add-product"]';
        this.productnameInput = '[data-cy="productName"]';
        this.productpriceInput = '[data-cy="productPrice"]';
        this.productcardInput = '[data-cy="productCard"]';
        this.productIDInput = '[data-cy="productID"]';
        this.createproductButton = '[data-cy="createProduct"]';
        this.closemodalButton = '[data-cy="closeModal"]';
        this.deleteproductModal = '#saveEdit';
    }

    getDeleteProductButton(productID) {
        return `[data-cy="delete-${productID}"]`;
    }

    addProduct(productName, productPrice, productCard, productID) {
        cy.get(this.addproductButton).click();
        cy.get(this.productnameInput).type(productName);
        cy.get(this.productpriceInput).type(productPrice);
        cy.get(this.productcardInput).type(productCard);
        cy.get(this.productIDInput).type(productID);
        cy.get(this.createproductButton).click();
        cy.get(this.closemodalButton).click();
    }

    deleteProduct(productID) {
        cy.get(this.getDeleteProductButton(productID)).click();
    }

    deleteproductModal() {
        cy.get(this.deleteproductModal).click();
    }
}
 
