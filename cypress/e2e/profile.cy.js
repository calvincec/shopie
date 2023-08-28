describe('Edit Profile Page', () => {

    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/Frontend/login/login.html')
      cy.get('input#email').type('newemail@example.com');
      cy.get('input#password').type('12345678');
      cy.get('form#form-login').submit();
      cy.get('#person-icon').click()
      cy.get('#viewProfile').click()
    });


  


  it('should display user details', () => {
      cy.get('#name').should('be.visible');
      cy.get('#email').should('be.visible');

  });

  it('should edit user profile details', () => {
    
    cy.get('#editButton').click();

    cy.get('#email input').should('be.visible');
    cy.get('#phone-number input').should('be.visible');

    cy.get('#email input').clear().type('moph2@mail.com');
    cy.get('#phone-number input').clear().type('12345678');

    cy.get('#saveButton').click();

    cy.get('#email').should('contain', 'moph2@mail.com');
    cy.get('#phone-number').should('contain', '12345678');
});
it('should deactivate account redirect user to homescreen', () => {
  cy.get('#delete-profile').click();
  cy.on('window:confirm', () => true);


  cy.url().should('include', '/Frontend/welcome.html');
});

});
