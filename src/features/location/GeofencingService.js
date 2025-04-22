// External imports
import Radar from "react-native-radar";
import notifee, { AndroidImportance } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RADAR_KEY } from "./RadarKey";

// Constants for storage keys
const STORAGE_KEYS = {
    SELECTED_LIST: 'smart_reminder_list',
    SELECTED_CHAINS: 'smart_reminder_chains',
    ENABLED: 'smart_reminder_enabled'
};

// Background event listener to stop the warnings. Navigation is handled via App.js.
notifee.onBackgroundEvent(async ({ type, detail }) => {
    return;
});

// Variable to hold the notification channel ID
let channelId = null;
let isInitialized = false;
let isTracking = false;

/**
 * Resets the geofencing service by stopping tracking and removing event listeners
 * @async
 * @function stopTrackingGeofences
 */
const stopTrackingGeofences = async () => {
    // Don't try to stop if we're not tracking
    if (!isInitialized || !isTracking) {
        return;
    }
    
    try {
        // Stop tracking and reset geofencing
        Radar.off("events"); // Remove ALL event listeners first
        await Radar.stopTracking();
        isTracking = false;
        console.log("Geofencing service stopped");
    } catch (error) {
        console.error("Error stopping geofencing:", error);
    }
}

/**
 * Starts tracking geofences and sets up event listeners
 * @async
 * @function startTrackingGeofences
 */
const startTrackingGeofences = async () => {
    // Make sure we're initialized
    if (!isInitialized) {
        await initGeofencing();
    }
    
    // Don't start if already tracking
    if (isTracking) {
        console.log("Geofencing service already running");
        return;
    }
    
    try {
        // Ensure we have a reminder enabled, a list selected, and chains selected
        const [enabledData, selectedListKey, selectedChainsData] = await Promise.all([
            AsyncStorage.getItem(STORAGE_KEYS.ENABLED),
            AsyncStorage.getItem(STORAGE_KEYS.SELECTED_LIST),
            AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CHAINS)
        ]);
        
        const selectedChains = selectedChainsData ? JSON.parse(selectedChainsData) : [];
        
        if (enabledData !== 'true' || !selectedListKey || selectedChains.length === 0) {
            console.log("Cannot start geofencing: reminder not enabled, no list selected, or no chains selected");
            return;
        }
    
        // Create channel if it doesn't exist
        if (!channelId) {
            channelId = await notifee.createChannel({
                id: "default",
                name: "Default Channel",
                importance: AndroidImportance.HIGH,
            });
        }
        
        // Make sure we have no existing listeners
        Radar.off("events");
        
        // Start tracking and set up event listeners
        Radar.on("events", handleGeofenceEvents(channelId));
        await Radar.startTrackingContinuous();
        isTracking = true;
        console.log("Geofencing service started");
    } catch (error) {
        console.error("Error starting geofencing:", error);
        isTracking = false;
    }
}

/**
 * Initializes and manages geofencing functionality with Radar.io integration
 * @async
 * @function initGeofencing
 * @returns {Promise<void>}
 */
const initGeofencing = async () => {
    try {
        // Only initialize once
        if (isInitialized) return;
        
        // Initialize notification channel
        channelId = await notifee.createChannel({
            id: "default",
            name: "Default Channel",
            importance: AndroidImportance.HIGH,
        });

        // Initialize Radar tracking
        Radar.initialize(RADAR_KEY);
        Radar.setLogLevel("debug");
        
        isInitialized = true;
        
        // First check if reminders are enabled
        const [enabledData, selectedChainsData] = await Promise.all([
            AsyncStorage.getItem(STORAGE_KEYS.ENABLED),
            AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CHAINS)
        ]);
        
        const isEnabled = enabledData === 'true';
        const selectedChains = selectedChainsData ? JSON.parse(selectedChainsData) : [];
        const hasChains = selectedChains.length > 0;

        // Only start tracking if reminders are enabled and chains are selected
        if (isEnabled && hasChains) {
            console.log("Smart reminders are enabled, starting geofence tracking");
            await stopTrackingGeofences(); // Ensure clean slate
            await startTrackingGeofences();
        } else {
            console.log("Smart reminders disabled or no chains selected, not starting geofence tracking");
            await stopTrackingGeofences();
        }

        console.log("Geofencing service initialized");
    } catch (error) {
        console.error("Error initializing geofencing:", error);
    }
};

/**
 * Extract chain ID from geofence ID
 * Format: "brand - address"
 * @param {string} geofenceId - The geofence ID
 * @returns {string} The extracted chain ID
 */
const extractChainId = (geofenceId) => {
    if (!geofenceId) return '';
    
    // Split the geofence ID at the first occurrence of " - "
    const parts = geofenceId.split(' - ');
    if (parts.length < 2) return geofenceId; // Return original if format doesn't match
    
    // Return the brand part, trimmed
    return parts[0].trim().toLowerCase();
};

/**
 * Creates an event handler for geofence events
 * @param {string} channelId - Notification channel ID
 * @returns {Function} Event handler function
 */
const handleGeofenceEvents = (channelId) => async (result) => {
    try {
        const { events } = result;
        if (!events?.length) return;
        
        // Check if reminders are still enabled before processing events
        const [enabledData, selectedListKey, selectedChainsData] = await Promise.all([
            AsyncStorage.getItem(STORAGE_KEYS.ENABLED),
            AsyncStorage.getItem(STORAGE_KEYS.SELECTED_LIST),
            AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CHAINS)
        ]);
        
        // Parse selected chains
        const selectedChains = selectedChainsData ? JSON.parse(selectedChainsData) : [];
        
        if (enabledData !== 'true' || !selectedListKey || selectedChains.length === 0) {
            console.log("Reminder not enabled, no list selected, or no chains selected, ignoring geofence events");
            return;
        }

        for (const event of events) {
            switch (event.type) {
                case "user.entered_geofence": 
                    // Extract the chain ID from the geofence ID
                    const geofenceChain = extractChainId(event.geofence.description);
                    
                    // Check if the chain is in the selected chains
                    const isSelectedChain = selectedChains.some(chain => 
                        geofenceChain === chain.toLowerCase() || 
                        geofenceChain.includes(chain.toLowerCase())
                    );
                    
                    if (isSelectedChain) {
                        console.log(`Chain ${geofenceChain} is selected, showing notification`);
                        await handleGeofenceEntry(event, channelId, selectedListKey);
                    } else {
                        console.log(`Chain ${geofenceChain} is not selected, ignoring`);
                    }
                    break;
                case "user.exited_geofence":
                    await handleGeofenceExit(event);
                    break;
            }
        }
    } catch (error) {
        console.error("Error handling geofence event:", error);
    }
};

/**
 * Creates a notification object for geofence events
 * @param {GeofenceEvent} event - Geofence event
 * @param {string} channelId - Notification channel ID
 * @param {string} listKey - Selected list key
 * @returns {Object} Notification object
 */
const createNotification = (event, channelId, listKey) => {
    // Extract store name and address from the geofence description
    const geofenceId = event.geofence.description;
    const parts = geofenceId.split(' - ');
    const storeName = parts.length > 0 ? parts[0] : geofenceId;
    const address = parts.length > 1 ? parts[1] : '';
    
    return {
        id: "Geofence_notification",
        title: `יש לך רשימת קניות ל${storeName}`,
        body: address || event.geofence.description || "אתה נמצא ליד חנות מהרשימות שלך",
        android: {
            channelId,
            importance: AndroidImportance.HIGH,
            pressAction: {
                id: 'default',
                launchActivity: 'default',
            },
            actions: [{
                title: 'פתח את רשימת הקניות',
                pressAction: {
                    id: 'open_lists',
                    launchActivity: 'default',
                },
            }],
        },
        data: {
            screen: 'editList',
            params: { listKey }, 
        },
    }
}

/**
 * Handles geofence entry events
 * @param {GeofenceEvent} event - Geofence entry event
 * @param {string} channelId - Notification channel ID
 * @param {string} listKey - Selected list key
 */
const handleGeofenceEntry = async (event, channelId, listKey) => {
    try {
        console.log(`ENTERED GEOFENCE: ${event.geofence._id}`);
        
        const notification = createNotification(event, channelId, listKey);
        await notifee.displayNotification(notification);
    } catch (error) {
        console.error("Error displaying notification:", error);
    }
};

/**
 * Handles geofence exit events
 * @param {GeofenceEvent} event - Geofence exit event
 */
const handleGeofenceExit = async (event) => {
    try {
        console.log(`EXITED GEOFENCE: ${event.geofence._id}`);
        await notifee.cancelNotification("Geofence_notificationr");
    } catch (error) {
        console.error("Error canceling notification:", error);
    }
};

export { initGeofencing as default, startTrackingGeofences, stopTrackingGeofences };
