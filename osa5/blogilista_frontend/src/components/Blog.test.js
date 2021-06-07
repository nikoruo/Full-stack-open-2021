import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title : 'Component testing is done with react-testing-library',
    author: 'test',
    url: 'url',
    likes: 10
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).not.toHaveTextContent(
    'url'
  )
  expect(component.container).not.toHaveTextContent(
    '10'
  )
  expect(component.container).toHaveTextContent(
    'test'
  )
})