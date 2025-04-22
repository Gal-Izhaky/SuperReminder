// External imports
import { useState, useEffect } from 'react';

// Internal imports
import PermissionManager from "../../core/permissions/PermissionManager";
import initGeofencing from './GeofencingService';

/**
 * useGeofencing hook
 * Manages geofencing permissions and initialization
 */
const useGeofencing = () => {
    // State management
    const [hasPermissions, setHasPermissions] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Effects
    useEffect(() => {
        // Request necessary permissions on component mount
        PermissionManager.requestReminderNeededPermissions(setHasPermissions);
    }, []);

    useEffect(() => {
        // Initialize geofencing when permissions are granted
        if (hasPermissions && !isInitialized) {
            console.log("Permissions granted");
            initGeofencing();
            setIsInitialized(true);
        }
    }, [hasPermissions, isInitialized]);

    return { hasPermissions, isInitialized };
};

export default useGeofencing;
