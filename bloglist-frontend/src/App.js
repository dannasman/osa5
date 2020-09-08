import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
	const [message, setMessage] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			const initialBlogs = await blogService.getAll()
			setBlogs(initialBlogs)
		}
		fetchData()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setMessage(`logged in as ${user.name}`)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('wrong username or password')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
	}

	const addBlog = async (blogObject) => {
		try {
			const blog = await blogService.create(blogObject)
			setBlogs(blogs.concat(blog))
			setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch (exception) {
			setErrorMessage('adding a blog failed')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const updateBlog = async (id, blogObject) => {
		try {
			const blog = await blogService.update(id, blogObject)
			setBlogs(blogs.map(b => b.id === id ? blog : b))
		} catch (exception) {
			setErrorMessage('updating a blog failed')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const deleteBlog = async (blog) => {
		try {
			const ok = window.confirm(`remove ${blog.title}`)
			if (ok) {
				await blogService.remove(blog.id)
				setMessage('blog removed')
				setTimeout(() => {
					setMessage(null)
				}, 5000)
				setBlogs(blogs.filter(b => b.id !== blog.id))
			}
		} catch (exception) {
			setErrorMessage('deleting a blog failed')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)

	return (
		<div>
			{message !== null ? <p>{message}</p> : null}
			{errorMessage !== null ? <p>{errorMessage}</p> : null}
			<h2>Login</h2>

			{user === null ?
				loginForm() :
				<div>
					{user.name} logged in<button onClick={handleLogout}>Log out</button>
					<Togglable buttonLabel="new blog ">
						<BlogForm createBlog={addBlog} />
					</Togglable>
					<div id="blogs">
						{blogs.sort((a, b) => b.likes - a.likes).map(b => <Blog blog={b} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} key={b.id} />)}
					</div>
				</div>
			}
		</div >
	)
}

export default App