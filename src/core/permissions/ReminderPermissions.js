import { Platform } from "react-native";
import { requestNotifications, PERMISSIONS, request } from "react-native-permissions";

export const requestBackgroundLocationPermissions = async () => {
    try {
        const foregroundPermission = 
            Platform.OS === "ios"
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : Platform.OS === "android"
            ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            : null;

        const backgroundPermissions = 
            Platform.OS === "ios"
            ? PERMISSIONS.IOS.LOCATION_ALWAYS
            : Platform.OS === "android"
            ? PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
            : null;

        if(!backgroundPermissions || !foregroundPermission){
            return false
        }

        const foregroundStatus = await request(foregroundPermission);

        if (foregroundStatus !== 'granted') {
            return false;
        }

        // Then request background permission
        const backgroundStatus = await request(backgroundPermissions);

        return backgroundStatus === 'granted';
    } catch (error) {
        console.error("Error requesting location permissions:", error);
        return false;
    }
};

export const requestNotificationPermissions = async () => {
    const { status, settings } = await requestNotifications(["alert", "sound"]);

    return status === "granted";
};
