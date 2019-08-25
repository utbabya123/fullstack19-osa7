import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import useField from '../hooks/index'

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
      <form onSubmit={handleSubmit} className='loginform'>
        <div>
          käyttäjätunnus
          <input {...username} />
        </div>
        <div>
          salasana
          <input {...password} />
        </div>
        <button type='submit'>kirjaudu</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { loginUser }
)(LoginForm)