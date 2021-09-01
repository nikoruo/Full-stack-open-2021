import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap'

const Comments = ({ blog, addComments }) => {
  const [comment, setComment] = useState('')

  const containerStyle = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 50,
    marginRight: 50
  }

  const addComment = () => {
    event.preventDefault()
    addComments({
      comments: comment,
      id: blog.id
    })
    setComment('')
  }

  const comments = blog.comments.map(comment => <ListGroup.Item key={comment}>{comment}</ListGroup.Item>)

  return (
    <div style={containerStyle} className='blog'>
      <div>
        <h2>comments</h2>
        <div>
          <input
            id='comment'
            type="text"
            value={comment}
            name="comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <button onClick={addComment}>add comment</button>
        </div>
        <ListGroup>
          {comments}
        </ListGroup>
      </div>
    </div>
  )
}

Comments.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Comments