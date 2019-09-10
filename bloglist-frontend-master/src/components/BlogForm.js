import React from 'react'
import PropTypes from 'prop-types'
import useField from '../hooks/index'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = (props) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.createBlog(title.value, author.value, url.value)
    resetTitle()
    resetAuthor()
    resetUrl()
    props.setFormVisible(false)
  }

  return (
    <div>
      <h1>create new</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          title
          <input {...title} />
        </Form.Field>
        <Form.Field>
          author
          <input {...author} />
        </Form.Field>
        <Form.Field>
          url
          <input {...url} />
        </Form.Field>
        <Button type="submit">create</Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  setFormVisible: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    setFormVisible: ownProps.setFormVisible
  }
}

export default connect(
  mapStateToProps,
  { createBlog }
)(BlogForm)
