import { route, protectedRoute } from "./apiConfig";

/**
 * Initiate BankID Authentication
 * @returns {Promise<Object>} - Authentication initiation details.
 */
export const initiateAuthentication = async () => {
  try {
    console.log('🚀 Initiating BankID authentication...');
    const response = await route.post("/auth/bank_id");
    console.log('🚀 Authentication response:', response.data);
    
    // For debugging purposes, let's also check if we're in a test environment
    // and potentially override the orderRef to "test" to match server broadcasts
    if (import.meta.env.DEV && response.data.orderRef) {
      console.log('🧪 Development mode - original orderRef:', response.data.orderRef);
      
      // Temporarily use "test" for debugging the WebSocket issue
      if (window.location.search.includes('test=true')) {
        console.log('🧪 Test mode detected - using "test" as orderRef');
        return {
          ...response.data,
          orderRef: 'test'
        };
      }
    }
    
    return response.data;
  } catch (error) {
    console.error("Failed to initiate authentication:", error.message);
    throw error;
  }
};

/**
 * Complete Authentication with User Details
 * @param {Object} userData - User details from BankID
 * @returns {Promise<Object>} - Authenticated user data
 */
export const completeAuthentication = async (userData) => {
  try {
    console.log('🔗 Completing authentication with userData:', userData);
    const response = await route.post("/auth", userData);
    console.log('🔗 Complete authentication response:', response.data);
    return response.data;
  } catch (error) {
    console.error('🔗 Complete authentication error:', error);
    const errorMsg = error.response?.data?.error || error.data?.error || "Authentication failed";
    throw new Error(errorMsg);
  }
};

/**
 * Validate Token and Fetch User Data
 * @returns {Promise<Object>} - Resolves with user data if validation is successful
 */
export const validateToken = async () => {
  try {
    const response = await protectedRoute.get("/validate_token");
    return response.data.user;
  } catch (error) {
    console.error("Token validation failed:", error.message);
    throw error;
  }
};

/**
 * Log out the current user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await protectedRoute.delete("/logout");
    // Clear user token from localStorage
    localStorage.removeItem("Authorization");
    return true;
  } catch (error) {
    console.error("Logout failed:", error.message);
    throw error;
  }
};

export default {
  initiateAuthentication,
  completeAuthentication,
  validateToken,
  logout
};
