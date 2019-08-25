const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {...action.data}
    case 'CLEAR_MESSAGE':
      return null
    default:
      return state
  }
}

export const setNotification = (type, message) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      data: {
        type,
        message
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      })
    }, 3000)
  }
}

export default notificationReducer