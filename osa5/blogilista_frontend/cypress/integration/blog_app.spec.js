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
    cy.get('#blogForm').should('not.exist')
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

  //blogin luominen
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypress', password: 'secret', id: '60bdf935f30f31361c439b08' })
      cy.createBlog({
        title: 'blog to be created',
        author: 'cy',
        url: 'no need',
        user: '60bdf935f30f31361c439b08'
      })
    })

    //uuden blogin luominen
    it('A blog can be created', function () {
      cy.get('#blogForm').should('contain', 'blog to be created cy')
    })

    //blogista tykk‰‰minen
    it('A blog can be liked', function () {
      cy.contains('blog to be created cy').parent().find('button').click()
      cy.contains('blog to be created cy').parent().contains('like').parent().find('button').click()
      cy.contains('You just liked blog to be created by cy')
    })

    //blogin poistaminen
    it('A blog can be deleted by owner', function () {

      cy.contains('blog to be created cy').parent().find('button').click()
      cy.contains('blog to be created cy').parent().contains('remove').click()
      cy.contains('You just removed blog to be created by cy')
    })

    //blogin poistaminen jonkun muun toimesta ei onnistu
    it('A blog cannot be deleted by random', function () {
      cy.contains('logout').click()
      const user = {
        name: 'random E2E',
        username: 'random',
        password: 'generator'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'random', password: 'generator', id: '50bdf935f30f31361c439b08' })


      cy.contains('blog to be created cy').parent().find('button').click()
      cy.get('.dB').should('not.exist')
    })
  })
})