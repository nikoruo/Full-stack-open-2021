describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress E2E',
      username: 'cypress',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  //ensimm‰inen sivu n‰ytt‰‰ loginformin
  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('blogForm').should('not.exist')
  })

  //kirjautumiseen liittyv‰t testit
  describe('Login', function () {

    //oikeilla onnistuu
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cypress')
      cy.get('#password').type('secret')
      cy.get('#submitLogin').click()

      cy.contains('Cypress E2E logged in')
    })

    //v‰‰rill‰ ei
    it('fails with wrong credentials', function () {
      cy.get('#username').type('cypress')
      cy.get('#password').type('sekret')
      cy.get('#submitLogin').click()

      cy.get('.error').should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})