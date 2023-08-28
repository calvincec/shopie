import 'cypress-file-upload';
describe('Admin page view', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/Frontend/login/login.html')
      cy.get('input#email').type('calyndemo16@gmail.com');
      cy.get('input#password').type('123456789');
      cy.get('form#form-login').submit();
    });
  
    it('should login and proceed to dashboard', () => {
     
      cy.url().should('eq', 'http://127.0.0.1:5500/Frontend/dashboard/dashboard.html')
    });
  


    it('should add a  new product',()=>{
      cy.get('#add-products').click()
      cy.get('#product-name').type('shirt good')
      cy.get('#product-description').type('wear to look smart')
      cy.get('#product-price').type(900)
      cy.get('#product-stock').type(8)
      cy.get('#product-image').attachFile('images/Cotton T-shirts.jpg') 
      cy.wait(2000)
      cy.get('.btn').click()
      cy.get('.msg').contains('Product added successfully') 
        cy.wait(5000)
    })



    it('shows error message when no product found on search bar', () => {
        
        cy.get('#searchadm').type('pehddj')
        cy.get('#productContaineradm')
          .should('be.visible').contains('No products available')
      })
    
    it('passes if search has results', () => {
        cy.get('#searchadm').type('t')
        cy.get('#productContaineradm')
          .should('be.visible').contains('t')
    })


    it('should update an item successfully', () => {
      cy.get('.edit').first().click()
    
      cy.get('#product-price').type(1000)
      cy.get('#product-stock').type(7)
      cy.get('#product-image').attachFile('images/sweat pant.jpg') 
      cy.wait(2000)
      cy.get('.btn').click()
      cy.wait(1000)
      cy.get('.msg').contains('Product updated successfully') 
   
  });

    it('should delete one product', ()=>{
        cy.get('.delete').first().click(); 
    })
  
  it('should log out', () => {
      cy.get('.dropdown-content').click(); 
      cy.get('#user-logout').click()
  
  
      cy.url().should('eq', 'http://127.0.0.1:5500/Frontend/welcome.html')
   
  });
  

  })