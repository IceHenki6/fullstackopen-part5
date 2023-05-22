import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('Testing blog component', () => {
  test('Renders blog preview', () => {
    const blog = {
      title: 'Why Kimi Raikkonen is the best driver of his generation',
      author: 'Federico Maximovicz',
      url: 'randomrul',
      likes: 2007,
      user: {
        username: 'tester',
        name: 'Mr Testarossa'
      }
    }
    const { container } = render(<Blog blog={blog}/>)
    const blogPreview = container.querySelector('.blog-preview')
    const blogDetails = container.querySelector('.blog-info')
    expect(blogPreview).toHaveTextContent('Why Kimi Raikkonen is the best driver of his generation')
    expect(blogPreview).toHaveTextContent('Federico Maximovicz')
    expect(blogDetails).toHaveStyle('display: none')
  })

  test('Button to show details displays blog details', async () => {
    const blog = {
      title: 'The McLaren days of Kimi Raikkonen',
      author: 'Federico Maximovicz',
      url: 'randomrul',
      likes: 2005,
      user: {
        username: 'tester',
        name: 'Mr Testarossa'
      }
    }

    const { container } = render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = container.querySelector('#show-details')
    await user.click(button)
    const blogDetails = container.querySelector('.blog-info')
    expect(blogDetails).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler the component received as prop is called twice', async () => {
    const blog = {
      title: 'Why is Kimi Raikkonen one of the most underrated F1 drivers in history',
      author: 'Federico Maximovicz',
      url: 'randomrul',
      likes: 2003,
      user: {
        username: 'tester',
        name: 'Mr Testarossa'
      }
    }

    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} likeBlog={mockHandler}/>)
    const user = userEvent.setup()
    const button = container.querySelector('.like-btn')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
