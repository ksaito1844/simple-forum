const notificationReducer = (state = {message: '', isError: false}, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action
    default:
      return state
  }
}

export const changeNotification = (content, time, isError = false) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      message: content,
      isError: isError
    })
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch({
          type: 'NEW_NOTIFICATION',
          message: '',
          isError: false,
        })
      }, time)
    })
  }
}

export const resetNotification = () => {
  return {
    type: 'NEW_NOTIFICATION',
    content: '',
  }
}

export default notificationReducer