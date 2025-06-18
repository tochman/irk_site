import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderRef: null,
  autoStartToken: null,
  qrCode: null,
  statusMessage: null,
  bankIdError: null,
  isAuthenticated: false,
  isAuthenticating: false,
  authenticatedUser: null,
  isNetworkError: false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAutoStartToken: (state, action) => {
      state.autoStartToken = action.payload;
    },
    setOrderRef: (state, action) => {
      state.orderRef = action.payload;
    },
    updateQRCode: (state, action) => {
      console.log('updateQRCode reducer called with:', action.payload);
      state.qrCode = action.payload.qrCode;
      console.log('New state after QR update:', state.qrCode);
    },
    updateStatusMessage: (state, action) => {
      state.statusMessage = action.payload;
    },
    bankIdAuthenticationError: (state, action) => {
      state.bankIdError = action.payload;
      state.isAuthenticating = false;
    },
    authenticateUserSuccess: (state, action) => {
      console.log('🎯 authenticateUserSuccess reducer called with payload:', action.payload);
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.bankIdError = null;
      // Handle different possible response structures
      state.authenticatedUser = action.payload.user || action.payload;
      console.log('🎯 Set authenticatedUser to:', state.authenticatedUser);
    },
    startAuthenticating: (state) => {
      state.isAuthenticating = true;
      state.bankIdError = null;
    },
    stopAuthenticating: (state) => {
      state.isAuthenticating = false;
    },
    setNetworkError: (state, action) => {
      state.isNetworkError = action.payload;
      state.isAuthenticating = false;
    },
    resetAuthentication: () => {
      return { ...initialState };
    },
  },
});

export const {
  setAutoStartToken,
  setOrderRef,
  updateQRCode,
  updateStatusMessage,
  bankIdAuthenticationError,
  authenticateUserSuccess,
  startAuthenticating,
  stopAuthenticating,
  setNetworkError,
  resetAuthentication,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
