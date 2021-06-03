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

  const showInfo = () => {
    return (
      <div>
        {blog.url}
        likes {blog.likes} <button>like</button>
        {blog.user.name}
      </div>
      )
  }
  console.log(blog)
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={()=>setVisible(!visible)}>view</button>
      </div>
      {visible ? <div>
        {blog.url}
        likes {blog.likes} <button>like</button>
        {blog.user.name}
      </div> : null}
    </div>
  )
}

export default Blog