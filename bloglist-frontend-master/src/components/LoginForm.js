import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import useField from '../hooks/index'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.loginUser(username, password)
    resetUsername()
    resetPassword()
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          käyttäjätunnus
          <input {...username} />
        </Form.Field>
        <Form.Field>
          salasana
          <input {...password} />
        </Form.Field>
        <Button type='submit'>kirjaudu</Button>
      </Form>
    </div>
  )
}

export default connect(
  null,
  { loginUser }
)(LoginForm)
