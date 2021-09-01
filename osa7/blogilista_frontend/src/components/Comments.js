import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Comments = ({ blog, addComments }) => {
  const [comment, setComment] = useState('')

  const containerStyle = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 50
  }

  const addComment = () => {
    addComments({
      comments: comment
    })
  }

  const comments = blog.comments.map(comment => <li key={comment}>{comment}</li>)

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
        <ul>
          {comments}
        </ul>
      </div>
    </div>
  )
}

Comments.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Comments