import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const UserList = (props) => {
  if (props.users === undefined) {
    return null
  }

  return (
    <div>
      <h1>users</h1>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>user</Table.HeaderCell>
            <Table.HeaderCell>blogs added</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
              <Table.Cell>{user.blogs.length ? user.blogs.length : 0}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

export default UserList
