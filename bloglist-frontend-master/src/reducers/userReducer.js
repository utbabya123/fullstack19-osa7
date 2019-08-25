import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import axios from 'axios'

const initialState = {
  currentUser: null,
  users: []
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {...state, currentUser: action.data}
    case 'LOGOUT':
      return initialState
    case 'INIT_USERS':
      return {...state, users: action.data}
    default:
      return state
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch({
        type: 'LOGIN_USER',
        data: user
      })
    } catch (e) {
      dispatch(setNotification('error', 'wrong username or password'))
    }
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/users')
      dispatch({
        type: 'INIT_USERS',
        data: response.data
      })
    } catch (e) {
      console.log(e)
    }
  }
}
export const logout = () => {
  return async dispatch => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const setUser = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN_USER',
      data: user
    })
  }
}

export default userReducer