import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const loggedUser = useSelector(state => state.user)

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
      user: loggedUser.id
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Form style={{ borderStyle: 'solid' }} id='form' onSubmit={addBlog}>
        <Form.Group style={{ padding: 5 }}>
          <h2>create new</h2>
          <Form.Label>title</Form.Label>
          <Form.Control
            id='title'
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author</Form.Label>
          <Form.Control
            id='author'
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            id='url'
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm