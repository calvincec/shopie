describe('Tests the customer`s dashboard', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Frontend/login/login.html')
    cy.get('input#email').type('fonani9890@hainals.com');
    cy.get('input#password').type('12345678');
    cy.get('form#form-login').submit();
  });

  it('should login and proceed to dashboard', () => {
   
    cy.url().should('eq', 'http://127.0.0.1:5500/Frontend/dashboard/dashboard.html')
  });


  it('should add a product to the cart', () => {
    cy.get('.add-button').first().click();
    cy.get('#toast').should('be.visible').contains('Added to Cart!');
});

it('should log out', () => {
    cy.get('#person-icon').click(); 
    cy.get('#user-logout').click()


    cy.url().should('eq', 'http://127.0.0.1:5500/Frontend/welcome.html')
 
});


it('should navigate to the cart page', () => {
    cy.get('#shopping-cart').click();
  
});
})