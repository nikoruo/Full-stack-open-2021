import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  test('visibility = false, renders content', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
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

  test('visibility = true, renders content', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'test',
      url: 'url',
      likes: 10,
      user: {
        name: 'fireEvent'
      }
    }
    const user = {
      username: 'fireEvent'
    }


    const component = render(
      <Blog blog={blog} user={user} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'url'
    )
    expect(component.container).toHaveTextContent(
      '10'
    )
  })
})