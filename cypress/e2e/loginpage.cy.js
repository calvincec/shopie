describe('Navigate to other pages', () => {
  it('Opens the login page from welcome page', () => {
    cy.visit('http://127.0.0.1:5500/Frontend/login/login.html')

  })
})
describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Frontend/login/login.html')
  });

  it('should display login form', () => {
    cy.get('form#form-login').should('be.visible');
  });

  it('should fill in and submit the login form', () => {
    cy.get('input#email').type('kevoooo@icloud.com');
    cy.get('input#password').type('12345678');
    cy.get('form#form-login').submit();
  });

  it('should show error messages when login fails', () => {
    cy.get('input#email').type('user@example.com');
    cy.get('input#password').type('password123');
    cy.get('form#form-login').submit();
    cy.get('#message-element').should('contain', 'Could not find an account associated with the email address')
  })

  it('should navigate to the registration page', () => {
    cy.get('h3#register').click();
    cy.url().should('include', '/Frontend/register/register.html');
  });

  it('should open dropdown menu when person icon is clicked', () => {
    cy.get('span#person').click();
    cy.get('.dropdown-content').should('be.visible');
  });

  it('should close dropdown menu when clicked outside', () => {
    cy.get('span#person').click();
    cy.get('body').click('top');
    cy.get('.dropdown-content').should('not.be.visible');
  });



  it('should login and proceed to dashboard', () => {
    cy.get('input#email').type('fonani9890@hainals.com');
    cy.get('input#password').type('12345678');
    cy.get('form#form-login').submit();
    
  });

});
