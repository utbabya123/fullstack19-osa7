import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
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
  Route,
  Link
} from 'react-router-dom'
import { Menu, Container, Button } from 'semantic-ui-react'

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
          <Button onClick={() => setFormVisible(true)}>create new</Button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm setFormVisible={setFormVisible}/>
          <Button onClick={() => setFormVisible(false)}>cancel</Button>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <Container>
        <Notification />
        <LoginForm />
      </Container>
    )
  }

  const blogById = (id) => props.blogs.find(blog => blog.id === id)

  return (
    <Container>
      <Router>
        <div>
          <Menu>
            <Menu.Item link>
              <Link to="/">blogs</Link>
            </Menu.Item>
            <Menu.Item link>
              <Link to="/users">users</Link>
            </Menu.Item>
            <Menu.Item>
              {currentUser.username} logged in
              <Button onClick={props.logout}>logout</Button>
            </Menu.Item>
          </Menu>
          <Notification />
          <h2>blog app</h2>
          <Route exact path="/" render={() => (
            <div>
              {blogForm()}
              <BlogList blogs={props.blogs.sort((a, b) => b.likes - a.likes)} />
            </div>
          )} />
          <Route exact path="/blogs/:id" render={({ match }) => <Blog blog={blogById(match.params.id)} />} />
          <Route exact path="/users" render={() => <UserList users={props.users}/>} />
          <Route exact path="/users/:id" render={({ match }) => <User id={match.params.id} />} />
        </div>
      </Router>
    </Container>
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
