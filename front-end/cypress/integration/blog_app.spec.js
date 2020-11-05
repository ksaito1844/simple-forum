describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Dustin Simensen',
      username: 'BigPusha',
      password: 'bigplaya'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3001')
  })

  it('shows the login form', function () {
    cy.contains('login')
  })
  describe('Login', function () {
    beforeEach(function () {
      cy.contains('login').click()
    })
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('BigPusha')
      cy.get('#password').type('bigplaya')
      cy.get('#login-button').click()

      cy.contains('Dustin Simensen is logged in')
    })
    it('fails with incorrect credentials', function () {
      cy.get('#username').type('BigPusha')
      cy.get('#password').type('badPassword')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong credentials')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'BigPusha', password: 'bigplaya' })

      cy.contains('new blog').click()
      cy.get('#title').type('This is a test blog!')
      cy.get('#url').type('www.cypress.com')
      cy.contains('create').click()
    })
    it('allows user to make a blog post', function () {
      cy.contains('This is a test blog!')
    })
    it('allows user to like a blog', function () {
      cy.contains('This is a test blog!').parent().find('button').as('theButton')
      cy.get('@theButton').click()
      cy.contains('like').click()

      cy.contains('likes: 1')
    })
    it('allows the user to delete a note', function () {
      cy.contains('This is a test blog!').parent().find('button').as('theButton')
      cy.get('@theButton').click()
      cy.contains('delete').click()

      cy.get('html').should('not.contain', 'This is a test blog!')
    })
    it('orders the blogs by amount of likes', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('This is another a test blog!')
      cy.get('#url').type('www.cypress.com')
      cy.contains('create').click()

      cy.contains('This is another a test blog!')
      cy.contains('This is a test blog!')

      cy.contains('This is a test blog!').parent().find('button').as('theButton')
      cy.get('@theButton').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
      cy.contains('hide').click()

      cy.get('.blog').first().should('contain', 'This is a test blog!')
    })
  })
})