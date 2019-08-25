import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE_BLOG':
      return state.map(b => b.id === action.data.id ? action.data : b)
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export const createBlog = (title, author, url) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create({ title, author, url })
      dispatch({
        type: 'CREATE_BLOG',
        data: newBlog
      })
      dispatch(setNotification('message', `a new blog ${newBlog.title} by ${newBlog.author} added`))
    } catch (e) {
      console.log(e)
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const blogObject = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user ? blog.user.id : null
      }
      const newBlog = await blogService.update(blogObject.id, blogObject)
      dispatch({
        type: 'LIKE_BLOG',
        data: newBlog
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: 'DELETE_BLOG',
        data: blog
      })
      dispatch(setNotification('message', 'blog removed'))
    } catch (e) {
      console.log(e)
    }
  }
}

export default blogReducer