import loginService from '../services/login'
import usersService from '../services/users'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return action.data
    case 'REGISTER':
      return action.data
    case 'ALREADY_LOGGED_IN':
      return action.data
    default:
      return state
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

export const registerUser = (name, username, password) => {
  return async dispatch => {
    const user = await usersService.register({
      name, username, password
    })
    console.log(user)
    dispatch({
      type: 'REGISTER',
      data: user
    })
  }
}

export const alreadyLoggedIn = (user) => {
  return async dispatch => {
    dispatch({
      type: 'ALREADY_LOGGED_IN',
      data: user
    })
  }
}

export default userReducer