import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
	let component
	const mockCreateBlog = jest.fn()
	beforeEach(() => {
		component = render(
			<BlogForm createBlog={mockCreateBlog} />
		)
	})

	test('component calls the callback function with right parameters', () => {
		const titleInput = component.container.querySelector('#title')
		const authorInput = component.container.querySelector('#author')
		const urlInput = component.container.querySelector('#url')
		const form = component.container.querySelector('form')

		fireEvent.change(titleInput, {
			target: { value: 'testing title' }
		})

		fireEvent.change(authorInput, {
			target: { value: 'testing author' }
		})

		fireEvent.change(urlInput, {
			target: { value: 'testing url' }
		})

		fireEvent.submit(form)

		expect(mockCreateBlog.mock.calls).toHaveLength(1)
		expect(mockCreateBlog.mock.calls[0][0].title).toBe('testing title')
		expect(mockCreateBlog.mock.calls[0][0].author).toBe('testing author')
		expect(mockCreateBlog.mock.calls[0][0].url).toBe('testing url')


	})
})