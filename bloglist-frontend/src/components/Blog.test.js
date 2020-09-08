import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
	let component

	const user = {
		id: 'test'
	}

	const blog = {
		title: 'just testing',
		author: 'dan',
		url: 'test.com',
		likes: 0,
		user: user.id
	}

	const mockUpdateHandler = jest.fn()
	const mockDeleteBlog = jest.fn()

	beforeEach(() => {
		component = render(
			<Blog blog={blog} updateBlog={mockUpdateHandler} deleteBlog={mockDeleteBlog} user={user} />
		)
	})

	test('renders title, author and url', () => {

		expect(component.container).toHaveTextContent(
			'just testing dan'
		)

	})

	test('renders title, author, url, likes and user after show-button is pressed', () => {
		const button = component.getByText('view')
		fireEvent.click(button)
		expect(component.container).toHaveTextContent(
			'just testing danhidetest.comlikes 0 likeremove'
		)
	})

	test('when like-button is pressed twice the event handler is called twice', () => {
		fireEvent.click(component.getByText('view'))
		const button = component.getByText('like')
		fireEvent.click(button)
		fireEvent.click(button)

		expect(mockUpdateHandler.mock.calls).toHaveLength(2)
	})
})