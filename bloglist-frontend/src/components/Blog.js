import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [showAllInformation, setShowAllInformation] = useState(false)

	const toggleShowAllInformation = () => {
		setShowAllInformation(!showAllInformation)
	}

	const changeLikes = () => {
		updateBlog(blog.id, {
			title: blog.title,
			url: blog.url,
			likes: blog.likes + 1,
			user: blog.user.id
		})
	}

	const removeBlog = () => {
		deleteBlog(blog)
	}

	return (<div style={blogStyle} className='blog'>
		{showAllInformation ? <div>
			{blog.title}  {blog.author}<button onClick={toggleShowAllInformation}>hide</button>
			<p>{blog.url}</p>
      likes {blog.likes} <button onClick={changeLikes}>like</button>
			<p>{blog.user.name}</p>
			{user.name === blog.user.name ? <button onClick={removeBlog}>remove</button> : console.log('hmm')}
		</div> : <div>{blog.title}  {blog.author}<button onClick={toggleShowAllInformation}>view</button></div>
		}</div>)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	updateBlog: PropTypes.func.isRequired,
	deleteBlog: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
}

export default Blog
