import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: title,
			author: author,
			url: url
		})

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit={addBlog}>
				<div>
					title
					<input
						type="text"
						id="title"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						type="text"
						id="author"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url
					<input
						type="text"
						id="url"
						value={url}
						name="url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">save</button>
			</form>
		</div>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired
}

export default BlogForm