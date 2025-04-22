import { requestCameraPermissions } from "./CameraPermissions";
import { requestBackgroundLocationPermissions, requestNotificationPermissions } from "./ReminderPermissions";


const requestReminderNeededPermissions = async (stateCallback) => {
    const bgPerms = await requestBackgroundLocationPermissions();
    const notificationPerms = await requestNotificationPermissions();

    stateCallback(bgPerms && notificationPerms);
};

const PermissionManager = {
    requestReminderNeededPermissions,
    requestCameraPermissions,
};

export default PermissionManager;
