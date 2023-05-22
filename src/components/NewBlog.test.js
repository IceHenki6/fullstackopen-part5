import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NewBlog from './NewBlog'

test('The form calls the event handler with the correct details when a new blog is created', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<NewBlog createBlog={createBlog}/>)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')

  const createButton = container.querySelector('#create-btn')

  await user.type(titleInput, 'Finnish Rally legends')
  await user.type(authorInput, 'Federico Maximovicz')
  await user.type(urlInput, 'aurllol')

  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('Finnish Rally legends')
  expect(createBlog.mock.calls[0][0].author).toBe('Federico Maximovicz')
  expect(createBlog.mock.calls[0][0].url).toBe('aurllol')
})