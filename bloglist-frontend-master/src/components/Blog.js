import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const { blog, currentUser } = props

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (event, blog) => {
    event.stopPropagation()
    props.likeBlog(blog)
  }

  const handleDelete = (event, blog) => {
    event.stopPropagation()
    if (window.confirm(`remove ${blog.title} by ${blog.author}?`)) {
      props.deleteBlog(blog)
    }
  }

  if (!visible) {
    return (
      <div onClick={() => setVisible(true)} style={blogStyle} className='blogSimple'>
        {blog.title} {blog.author}
      </div>
    )
  }

  return (
    <div onClick={() => setVisible(false)} style={blogStyle} className='blogFull'>
      <p>{blog.title} {blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} <button onClick={(event) => handleLike(event, blog)}>like</button></p>
      <p>added by {blog.user !== undefined ? blog.user.name : 'anonymous'}</p>
      {blog.user.username === currentUser.username && <button onClick={(event) => handleDelete(event, blog)}>remove</button>}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: ownProps.blog,
    currentUser: state.user.currentUser,
  }
}

export default connect(
  mapStateToProps,
  { likeBlog, deleteBlog }
)(Blog)