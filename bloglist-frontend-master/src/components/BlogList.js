import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => (
  <Table striped>
    <Table.Body>
      {blogs.map(blog =>
        <Table.Row key={blog.id}>
          <Table.Cell key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
)

export default BlogList
