import { setCurrentUser, resetCurrentUser } from '../slices/userSlice';

/**
 * Action creator: Log in a user
 * @param {Object} userData - The user data to store in state
 * @returns {Function} - Thunk action
 */
export const loginUser = (userData) => (dispatch) => {
  // Store the user in Redux state
  dispatch(setCurrentUser(userData));
  
  // Log the successful login
  console.log('User logged in:', userData);
  
  return userData;
};

/**
 * Action creator: Log out a user
 * @returns {Function} - Thunk action
 */
export const logoutUser = () => (dispatch) => {
  // Clear the user from Redux state
  dispatch(resetCurrentUser());
  
  // Remove the auth token from localStorage
  localStorage.removeItem('Authorization');
  
  console.log('User logged out');
  
  return true;
};

export default {
  loginUser,
  logoutUser
};
