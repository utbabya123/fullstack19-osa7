import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { withRouter } from 'react-router-dom'
import useField from '../hooks/index'
import { Form, Button } from 'semantic-ui-react'

const Blog = (props) => {
  const { reset: resetComment, ...comment } = useField('text')

  if (props.blog === undefined) {
    return null
  }
  
  const { blog, currentUser } = props

  const handleLike = (blog) => {
    props.likeBlog(blog)
  }

  const handleDelete = (blog) => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}?`)) {
      props.deleteBlog(blog)
      props.history.push('/')
    }
  }

  const handleSubmit = (event, blog) => {
    event.preventDefault()
    props.commentBlog(blog, comment.value)
    resetComment()
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} <Button onClick={() => handleLike(blog)}>like</Button></p>
      <p>added by {blog.user !== undefined ? blog.user.name : 'anonymous'}</p>
      {blog.user.username === currentUser.username && <Button onClick={() => handleDelete(blog)}>remove</Button>}
      <h3>comments</h3>
      <Form onSubmit={(event) => handleSubmit(event, blog)}>
        <input {...comment} />
        <Button type="submit">add comment</Button>
      </Form>
      <ul>
        {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: ownProps.blog,
    currentUser: state.user.currentUser,
    history: ownProps.history
  }
}

export default withRouter(connect(
  mapStateToProps,
  { likeBlog, deleteBlog, commentBlog }
)(Blog))