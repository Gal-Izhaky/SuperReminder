import { Platform } from "react-native";
import { PERMISSIONS, request } from "react-native-permissions";

export const requestCameraPermissions = async (stateCallback) => {
    const permission =
        Platform.OS === "ios"
            ? PERMISSIONS.IOS.CAMERA
            : Platform.OS === "android"
            ? PERMISSIONS.ANDROID.CAMERA
            : null;

    if (!permission) {
        return false;
    }

    const result = await request(permission);
    stateCallback(result === "granted");
};
