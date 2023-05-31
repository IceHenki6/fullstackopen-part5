describe('bloglist', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mr Testarossa',
      username: 'MrTester',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user1 = {
      name: 'Johny Test',
      username: 'JohnyHatesTesting',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)

    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function(){
    cy.contains('login')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function(){
      cy.contains('login').click()
      cy.get('#username').type('MrTester')
      cy.get('#password').type('test')
      cy.get('#login-btn').click()

      cy.contains('MrTester')
    })

    it('fails with wrong credentials', function(){
      cy.contains('login').click()
      cy.get('#username').type('MrTester')
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()

      cy.contains('Invalid username or password')
      cy.get('.error-msg').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error-msg').should('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'MrTester', password: 'test' })
    })

    it('A blog can be created', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('Testing with Cypress is awesome!')
      cy.get('#author').type('Fede')
      cy.get('#url').type('testingurl')
      cy.get('#create-btn').click()
      cy.contains('Testing with Cypress is awesome!')
    })

    describe('and some blogs are already created', function(){
      beforeEach(function(){
        cy.createBlog({ title: 'Cypress is cool', author: 'Fede', url: 'testurl' })
        cy.createBlog({ title: 'Why I love Fullstack Open', author: 'Fede', url: 'testurl' })
        cy.createBlog({ title: 'Another test', author: 'Fede', url: 'testurl' })
      })

      it('one of those blogs can be liked', function(){
        cy.contains('Why I love Fullstack Open').parent().parent().as('theBlog')
        cy.contains('Why I love Fullstack Open').parent().find('.view-btn').click()
        cy.get('@theBlog').find('.blog-info').as('blogInfo')
        cy.get('@blogInfo').find('.like-btn').click()
        cy.get('@blogInfo').contains(1)
      })

      //exercise 5.23 is here
      it('the blogs are ordered by the number of likes', function(){
        //gives a blog 2 likes
        cy.contains('Why I love Fullstack Open').parent().parent().as('theBlog')
        cy.contains('Why I love Fullstack Open').parent().find('.view-btn').click()
        cy.get('@theBlog').find('.blog-info').as('blogInfo')
        cy.get('@blogInfo').find('.like-btn').click().wait(1000).click()

        cy.wait(1000)
        //gives another blog 1 like
        cy.contains('Cypress is cool').parent().parent().as('theBlog')
        cy.contains('Cypress is cool').parent().find('.view-btn').click()
        cy.get('@theBlog').find('.blog-info').as('blogInfo')
        cy.get('@blogInfo').find('.like-btn').click()

        cy.get('.blog').eq(0).should('contain', 'Why I love Fullstack Open')
        cy.get('.blog').eq(1).should('contain', 'Cypress is cool')
      })
    })
  })

  describe('When a user is logged in, and there are blogs created by other users', function(){
    beforeEach(function(){
      cy.login({ username: 'JohnyHatesTesting', password: 'test' })
      cy.createBlog({ title: 'Test blog', author: 'nobody', url: 'testurl' })
      cy.createBlog({ title: 'Another test blog', author: 'also nobody', url: 'testurl' })
      cy.logout()

      cy.login({ username: 'MrTester', password: 'test' })
      cy.createBlog({ title: 'Delete test', author: 'Fede', url: 'testurl' })
    })
    it('A user can delete blogs he created', function(){
      cy.contains('Delete test').closest('.blog').as('theBlog')
      cy.contains('Delete test').parent().find('.view-btn').click()
      cy.get('@theBlog').find('.blog-info').as('blogInfo')
      cy.get('@blogInfo').find('.delete-blog__btn').click()
      cy.get('.blog').filter(':contains("Delete test")').should('have.length', 0)
    })

    it('Only the creator of a blog can see the delete button', function(){
      cy.contains('Test blog').closest('.blog').as('theBlog')
      cy.contains('Test blog').parent().find('.view-btn').click()
      cy.get('@theBlog').find('.blog-info').as('blogInfo')
      cy.get('@blogInfo').get('.delete-blog__btn').should('not.visible')
    })
  })
})