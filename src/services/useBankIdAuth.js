import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  initiateAuthentication as apiInitiateAuthentication,
  completeAuthentication,
} from "./Authentication";
import {
  setAutoStartToken,
  setOrderRef,
  updateQRCode,
  updateStatusMessage,
  bankIdAuthenticationError,
  authenticateUserSuccess,
  startAuthenticating,
  setNetworkError,
} from "../state/slices/authenticationSlice";
import useWebSockets from "./useWebSockets";

// Helper function to get status messages based on hint codes
const getStatusMessage = (hintCode, t) => {
  switch (hintCode) {
    case 'outstandingTransaction':
      return t('bankID.messages.processing');
    case 'userSign':
      return t('bankID.messages.signIn');
    case 'started':
      return t('bankID.messages.openBankIDApp');
    default:
      return t('bankID.messages.processing');
  }
};


const useBankIdAuth = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Local state for current order ref
  const [currentOrderRef, setCurrentOrderRef] = useState(null);

  // Pull relevant data from Redux
  const qrCode = useSelector((state) => state.authentication.qrCode);
  const autoStartToken = useSelector(
    (state) => state.authentication.autoStartToken
  );
  const authMessage = useSelector(
    (state) => state.authentication.statusMessage
  );
  const errorMessage = useSelector((state) => state.authentication.bankIdError);
  // For debugging purposes only
  // console.log("📋 Current errorMessage:", errorMessage);
  const isLoading = useSelector((state) => state.authentication.isLoading);
  const isNetworkError = useSelector((state) => state.authentication.isNetworkError);
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const authenticatedUser = useSelector(
    (state) => state.authentication.authenticatedUser
  );

  // Handle incoming ActionCable messages
  const handleMessage = useCallback(
    async (data) => {
      // For debugging purposes only
      // console.log("Received message from ActionCable:", data);
      // console.log("Message type:", typeof data);
      // console.log("Message keys:", Object.keys(data));

      // Ensure we have valid data
      if (!data || !data.event) {
        console.warn("Received invalid message format:", data);
        return;
      }

      switch (data.event) {
        case "qr_code":
        case "qr_code_updated":
          console.log("Received QR code event:", data.event);
          if (!data.qr_code) {
            console.warn("QR code event received but no qr_code in data:", data);
            return;
          }
          console.log("QR code data length:", data.qr_code.length);
          dispatch(updateQRCode({ qrCode: data.qr_code }));
          break;

        case "in_progress": {
          // Handle different hint codes for better user experience
          const message = data.hintCode ? getStatusMessage(data.hintCode, t) : (data.message || t('bankID.messages.processing'));
          dispatch(updateStatusMessage(message));
          break;
        }

        case "authenticated": {
          try {
            console.log("🎉 Authenticated event received!");
            console.log("🎉 Full data:", data);
            console.log("🎉 data.user:", data.user);
            console.log("🎉 data.user.table:", data.user.table);
            
            const userTable = data.user.table;
            const userData = {
              first_name: userTable.givenName,
              last_name: userTable.surname,
              identification_number: userTable.personalNumber,
              role: 'client'
            }
            console.log("🎉 Extracted userData:", userData);
            
            const authResponse = await completeAuthentication(userData);
            console.log("🎉 Auth response:", authResponse);
            
            // Ensure we preserve the original user data fields
            const finalUserData = {
              ...userData, // Preserve original BankID data (first_name, last_name, etc.)
              ...authResponse, // Add any additional data from server
            };
            console.log("🎉 Final user data:", finalUserData);
            
            dispatch(authenticateUserSuccess(finalUserData));
            setCurrentOrderRef(null);
          } catch (error) {
            console.error("❌ Authentication completion failed:", error);
            console.error("❌ Error details:", error.message);
            const errorMsg = error.message || t('bankID.messages.error');
            dispatch(bankIdAuthenticationError(errorMsg));
          }
          break;
        }

        case "failure": {
          console.log("🔥 FAILURE EVENT RECEIVED!", data);
          const errorMessage = t('bankID.messages.authenticationFailed');
          console.log("🔥 Translated error message:", errorMessage);
          console.log("🔥 About to dispatch bankIdAuthenticationError with:", errorMessage);
          dispatch(bankIdAuthenticationError(errorMessage));
          console.log("🔥 bankIdAuthenticationError dispatched");
          setCurrentOrderRef(null);
          break;
        }

        default:
          console.log("Received unknown event:", data.event);
          if (data.message) {
            dispatch(updateStatusMessage(data.message));
          }
          break;
      }
    },
    [dispatch, t]
  );

  // Custom ActionCable hook - no initial subscription
  const {
    subscribeToChannel,
    unsubscribeFromChannel,
    isConnected,
    isThinking,
  } = useWebSockets(
    import.meta.env.VITE_WEBSOCKET_URL,
    null, // No initial channel subscription
    handleMessage
  );

  // Start BankID Authentication
  const startAuthentication = useCallback(async () => {
    try {
      // Reset previous errors
      dispatch(startAuthenticating());
      dispatch(bankIdAuthenticationError(null));
      dispatch(setNetworkError(false));

      // 1) Initiate authentication - get orderRef from server
      const response = await apiInitiateAuthentication();
      console.log("Authentication initiated, response:", response);

      const { orderRef, autoStartToken, qrCode } = response;
      
      // 2) Update Redux
      if (orderRef) {
        console.log("Setting order ref:", orderRef);
        dispatch(setOrderRef(orderRef));
      }
      
      if (autoStartToken) {
        console.log("Setting auto start token:", autoStartToken);
        dispatch(setAutoStartToken(autoStartToken));
      }
      
      if (qrCode) {
        console.log("Setting QR code");
        dispatch(updateQRCode({ qrCode }));
      }

      // 3) Store in local state
      setCurrentOrderRef(orderRef);

      // 4) Now subscribe to WebSocket channel with the orderRef we just received
      const channelParams = { 
        channel: "BankIdAuthenticationChannel",
        orderRef: orderRef // Use the actual orderRef from the API response
      };
      console.log('🏦 Subscribing with orderRef from API:', JSON.stringify(channelParams, null, 2));
      subscribeToChannel(channelParams);
      
    } catch (error) {
      console.error("Authentication initiation failed:", error);
      
      // Check if it's a network error (safely)
      const errorMessage = error?.message || "Unknown error";
      const isNetworkError = 
        !navigator.onLine || 
        error?.name === 'AbortError' ||
        (typeof errorMessage === 'string' && (
          errorMessage.includes('Network Error') ||
          errorMessage.includes('Failed to fetch') ||
          errorMessage.includes('timeout')
        ));

      if (isNetworkError) {
        // Handle network-related errors
        dispatch(setNetworkError(true));
      } else {
        // Handle other errors
        dispatch(bankIdAuthenticationError(errorMessage));
      }
    }
  }, [dispatch, subscribeToChannel]);

  // Stop BankID Authentication (manual call if you want to unsubscribe)
  const stopAuthentication = useCallback(() => {
    if (unsubscribeFromChannel) {
      unsubscribeFromChannel();
      setCurrentOrderRef(null);
    }
  }, [unsubscribeFromChannel]);

  return {
    // Expose relevant actions
    startAuthentication,
    stopAuthentication,
    retryAuthentication: startAuthentication,

    // Expose connectivity state
    isConnected,
    isThinking,
    orderRef: currentOrderRef,

    // Return Redux values so the component can display them
    qrCode,
    autoStartToken,
    authMessage,
    errorMessage,
    isLoading,
    isAuthenticated,
    authenticatedUser,
    isNetworkError,
  };
};

export default useBankIdAuth;
