import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import authenticationReducer from './slices/authenticationSlice'

const rootReducer = combineReducers({
  user: userReducer,
  authentication: authenticationReducer
})

export default rootReducer