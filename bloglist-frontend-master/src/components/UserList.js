import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



const UserList = (props) => {
  if ( props.users === undefined) { 
    return null
  }

  return (
    <div>
      <h1>users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs added</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length ? user.blogs.length : 0}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.user.users
  }
}

export default connect(
  mapStateToProps,
  null
)(UserList)