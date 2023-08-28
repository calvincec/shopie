describe('Navigate to other pages', () => {
  it('Opens the login page from welcome page', () => {
    cy.visit('http://127.0.0.1:5500/Frontend/welcome.html')
    cy.get('#person-icon').click()
    cy.get('#user-login').click()
    cy.url().should('eq', 'http://127.0.0.1:5500/Frontend/login/login.html')
  })


  it('Opens the registration page from the welcome page', () => {
    cy.visit('http://127.0.0.1:5500/Frontend/welcome.html')
    cy.get('#person-icon').click()
    cy.get('#user-register').click()
    cy.url().should('eq', 'http://127.0.0.1:5500/Frontend/register/register.html')
  })
})


describe('diplay products', () => {
  it('shows animation when no results are found on search', () => {
    cy.visit('http://127.0.0.1:5500/Frontend/welcome.html')
    cy.get('#search').type('xiaomuii')
    cy.get('#lottie-animation')
      .should('be.visible')
  })

  it('hides animation if search has results', () => {
    cy.visit('http://127.0.0.1:5500/Frontend/welcome.html')
    cy.get('#search').type('vitro')
    cy.get('#lottie-animation')
      .should('not.be.visible')
  })

})