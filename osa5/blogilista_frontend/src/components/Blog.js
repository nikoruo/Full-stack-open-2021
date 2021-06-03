import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  return (
    <div style={blogStyle}>
      <div onClick={()=>setVisible(!visible)}>
        {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{ visible ? 'hide' : 'view' }</button>
      </div>
      {visible ? <ul>
        <li>{blog.url}</li>
        <li>likes {blog.likes} <button>like</button></li>
        <li>{blog.user.name}</li>
      </ul> : null}
    </div>
  )
}

export default Blog