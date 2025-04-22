// External imports
import { useEffect } from "react";
import notifee, { EventType } from "@notifee/react-native";

// Navigation
import { navigationRef } from "../navigation/NavigationRoot";

/**
 * useNotificationNavigation Hook
 * Handles navigation when app is opened from a notification
 * 
 * Features:
 * - Checks for initial notification
 * - Waits for navigation to be ready
 * - Times out after 5 seconds
 * - Navigates to specified screen with params
 */
export const useNotificationNavigation = () => {
    useEffect(() => {
        const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
            if (type === EventType.PRESS) {
                const { screen, params } = detail.notification?.data || {};

                if (screen && params) {
                    navigationRef.navigate(screen, params);
                }
            }
        });

        const checkNotification = async () => {
            // Get initial notification if app was opened from one
            const initialNotification = await notifee.getInitialNotification();
            if (!initialNotification) return;

            // Extract navigation data
            const { screen, params } = initialNotification.notification.data || {};
            
            // Wait for navigation to be ready
            const navigationReady = setInterval(() => {
                if (navigationRef.isReady()) {
                    clearInterval(navigationReady);
                    navigationRef.navigate(screen, params);
                }
            }, 100);

            // Clear interval if navigation takes too long
            setTimeout(() => {
                clearInterval(navigationReady);
            }, 5000);
        };
        
        checkNotification();

        return unsubscribe;
    }, []);
};

export default useNotificationNavigation;