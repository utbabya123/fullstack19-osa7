import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import './App.css'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, logout, initializeUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const App = (props) => {
  const [formVisible, setFormVisible] = useState(false)
  const { currentUser } = props

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      props.setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const blogForm = () => {
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setFormVisible(true)}>create new</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm setFormVisible={setFormVisible}/>
          <button onClick={() => setFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }
  
  return (
    <Router>
      <div>
        <Notification />
        <h2>blogs</h2>
        <p>{currentUser.username} logged in </p><button onClick={props.logout}>logout</button>
        <Route exact path="/" render={() => (
          <div>
            {blogForm()}
            <div className='bloglist'>
              {props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </div>
          </div>
        )} />
        <Route exact path="/users" render={() => <UserList />} />
        <Route exact path="/users/:id" render={({ match }) => <User id={match.params.id} />} />
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.user.users,
    currentUser: state.user.currentUser
  }
}

export default connect(
  mapStateToProps, 
  { setUser, logout, initializeBlogs, setNotification, initializeUsers }
)(App)