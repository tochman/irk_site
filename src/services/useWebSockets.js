import { useEffect, useState, useRef, useCallback } from "react";
import { createConsumer } from "@rails/actioncable";

/**
 * Custom Hook: useWebSockets
 *
 * @param {string} serverUrl - WebSocket server URL
 * @param {Object} initialChannel - Initial channel parameters
 * @param {Function} onDataReceived - Callback when data is received
 */
const useWebSockets = (serverUrl, initialChannel, onDataReceived) => {
  console.log('useWebSockets hook initialized with URL:', serverUrl);
  const cableRef = useRef(null); // Holds the ActionCable consumer
  const subscriptionRef = useRef(null); // Holds the current subscription
  const [isThinking, setIsThinking] = useState(false); // Tracks activity state
  const [isConnected, setIsConnected] = useState(false); // Tracks connection status

  /**
   * Subscribe to a channel
   * @param {Object} channelParams - Params for channel subscription
   */
  const subscribeToChannel = useCallback(
    (channelParams) => {
      if (!cableRef.current) {
        console.warn('ActionCable consumer not available');
        return;
      }
      
      console.log('🔌 Subscribing to channel with params:', JSON.stringify(channelParams, null, 2));
      console.log('🔌 ActionCable consumer state:', cableRef.current);
      console.log('🔌 ActionCable connection URL:', cableRef.current.url);
      
      // Unsubscribe from previous subscription if exists
      if (subscriptionRef.current) {
        console.log('🔌 Unsubscribing from previous channel');
        subscriptionRef.current.unsubscribe();
      }
      
      // Subscribe to the new channel
      subscriptionRef.current = cableRef.current.subscriptions.create(
        channelParams,
        {
          connected() {
            console.log("✅ Connected to channel:", JSON.stringify(channelParams));
            console.log("✅ Subscription object:", subscriptionRef.current);
            console.log("✅ Subscription identifier:", subscriptionRef.current.identifier);
            setIsConnected(true);
          },
          disconnected() {
            console.log(
              "❌ Disconnected from channel:",
              JSON.stringify(channelParams)
            );
            setIsConnected(false);
          },
          received(data) {
            console.log("📨 WebSocket received raw data:", data);
            console.log("📨 WebSocket data type:", typeof data);
            console.log("📨 WebSocket data keys:", Object.keys(data || {}));
            
            // Pass the entire data object to the handler
            // The handleMessage function needs the full object with event, message, etc.
            if (onDataReceived) {
              console.log("📨 Calling onDataReceived with full data:", data);
              onDataReceived(data);
            }
          },
          rejected() {
            console.warn(
              "❌ Subscription rejected:",
              JSON.stringify(channelParams)
            );
            console.warn("❌ This usually means the channel doesn't exist or parameters are invalid");
          },
        }
      );
      
      console.log('🔌 Subscription created:', subscriptionRef.current);
      console.log('🔌 Subscription identifier:', subscriptionRef.current?.identifier);
      
      // Add a small delay to check subscription status
      setTimeout(() => {
        if (subscriptionRef.current) {
          console.log('🔌 Subscription status after 1s:', subscriptionRef.current);
          console.log('🔌 Consumer subscriptions:', cableRef.current.subscriptions);
        }
      }, 1000);
    },
    [onDataReceived]
  );

  const unsubscribeFromChannel = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      console.log("Unsubscribed from channel");
    }
  };

  /**
   * Send a message to the server
   * @param {string} action - Action name defined in the channel
   * @param {Object} payload - Payload to send
   */
  const sendMessage = (action, payload) => {
    if (subscriptionRef.current) {
      setIsThinking(true);
      subscriptionRef.current.perform(action, payload);
      setIsThinking(false);
    } else {
      console.warn("No active subscription. Message not sent.");
    }
  };

  /**
   * Effect: Initialize WebSocket connection and subscribe to the initial channel
   */
  useEffect(() => {
    console.log('Creating ActionCable consumer with URL:', serverUrl);
    
    // Check if we're in a test environment and use mock if available
    if (window.Cypress && window.mockActionCable) {
      console.log('Test environment detected, using mock ActionCable consumer');
      cableRef.current = window.mockActionCable;
    } else {
      console.log('Production environment, creating real ActionCable consumer');
      cableRef.current = createConsumer(serverUrl);
    }
    
    // Expose ActionCable consumer to window for debugging
    window.App = window.App || {};
    window.App.cable = cableRef.current;

    if (initialChannel) {
      console.log('Initial channel provided:', initialChannel);
      subscribeToChannel(initialChannel);
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (cableRef.current) {
        cableRef.current.disconnect();
      }
    };
  }, [serverUrl, initialChannel, subscribeToChannel]);

  return {
    sendMessage,
    subscribeToChannel,
    unsubscribeFromChannel,
    isThinking,
    isConnected,
  };
};

export default useWebSockets;
