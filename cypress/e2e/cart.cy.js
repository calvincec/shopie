describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Frontend/login/login.html')
    cy.get('input#email').type('kevoooo@icloud.com');
    cy.get('input#password').type('12345678');
    cy.get('form#form-login').submit();
    cy.get('#shopping-cart').click();
  });

  it('should remove a product from the cart and update UI', () => {
  
    cy.get('.product-card').first().find('.remove-from-cart').click();
   
});

it('should display total items in cart', () => {
  cy.get('#total-items').should('not.be.empty')

});
it('should display total price', () => {
  cy.get('#total-price').should('not.be.empty')

});

})