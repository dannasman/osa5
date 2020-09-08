describe('Blog App', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			name: 'Dan',
			username: 'rainman',
			password: 'test'
		}
		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000/')
	})

	it('login form is visible', function () {
		cy.contains('login').click()
		cy.contains('username')
		cy.contains('password')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('login').click()
			cy.get('input:first').type('rainman')
			cy.get('input:last').type('test')
		})
		it('fails with wrong credentials', function () {
			cy.contains('login').click()
			cy.get('input:first').type('rainman')
			cy.get('input:last').type('tete')
			cy.contains('wrong username or password')
		})
	})

	describe.only('When logged in', function () {
		beforeEach(function () {
			cy.get('input:first').type('rainman')
			cy.get('input:last').type('test')
			cy.contains('login').click()
		})

		it('a blog can be created', function () {
			cy.contains('new blog').click()
			cy.get('#title').type('test')
			cy.get('#author').type('Dan')
			cy.get('#url').type('ok.com')
			cy.contains('save').click()
			cy.contains('a new blog test by Dan added')
		})
		it('a blog can be liked', function () {
			cy.contains('new blog').click()
			cy.get('#title').type('test')
			cy.get('#author').type('Dan')
			cy.get('#url').type('ok.com')
			cy.contains('save').click()
			cy.contains('a new blog test by Dan added')
			cy.contains('view').click()
			cy.contains('like').click()
			cy.contains('likes 1')
		})
		it('a blog can be removed', function () {
			cy.contains('new blog').click()
			cy.get('#title').type('test')
			cy.get('#author').type('Dan')
			cy.get('#url').type('ok.com')
			cy.contains('save').click()
			cy.contains('a new blog test by Dan added')
			cy.contains('view').click()
			cy.contains('remove').click()
			cy.contains('blog removed')
		})
		it('blogs are in order by likes', function () {
			cy.contains('new blog').click()
			cy.get('#title').type('test1')
			cy.get('#author').type('Dan')
			cy.get('#url').type('ok.com')
			cy.contains('save').click()

			cy.get('#title').type('test2')
			cy.get('#author').type('Dan')
			cy.get('#url').type('ok.com')
			cy.contains('save').click()
			cy.contains('view').click()
			cy.contains('like').click()
			cy.contains('view').click()

			cy.get('div.blog').then(($blog) => {
				expect($blog.first()).to.contain('likes 1')
				expect($blog.last()).to.contain('likes 0')
			})
		})
	})
})