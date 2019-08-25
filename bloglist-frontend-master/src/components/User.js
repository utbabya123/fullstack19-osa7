import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  if (props.users === undefined) {
    return null
  }
  const user = props.users.find(user => user.id === props.id)
  
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>  
        )} 
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    users: state.user.users
  }
}

export default connect(
  mapStateToProps,
  null
)(User)
