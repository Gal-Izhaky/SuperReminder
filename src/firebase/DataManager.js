// External imports
import { database, ref, get } from "./Config";
import FirebaseData from "../data/FirebaseData";

// Constants
const ONE_WEEK_IN_MILLIS = 7 * 24 * 60 * 60 * 1000;

/**
 * Fetches all data from Firebase database
 * @returns {Promise<Object>} Raw database snapshot
 */
const fetchAllData = async () => {
    const snapshot = await get(ref(database, "/"));
    return snapshot.val();
};

/**
 * Fetches last update timestamp from metadata
 * @returns {Promise<string>} Last update timestamp
 */
const fetchMetadata = async () => {
    const snapshot = await get(ref(database, "/metadata/last-updated"));
    return snapshot.val();
};

/**
 * Parses raw Firebase data into structured format
 * @param {Object} rawData - Raw data from Firebase
 * @returns {Object} Parsed data with metadata, supermarkets, and items
 */
const parseFunction = (rawData) => {
    // Parse metadata
    const metadata = {
        id: "metadata",
        itemsCounter: rawData.metadata?.["items-counter"] || 0,
        updateTime: rawData.metadata?.["last-updated"] || "",
        supermarketsCounter: rawData.metadata?.["supermarkets-counter"] || 0,
    };

    // Parse supermarkets
    const supermarkets = Object.values(rawData.supermarkets || {}).map((supermarket) => ({
        address: supermarket.address,
        brand: supermarket.brand,
        city: supermarket.city,
        latitude: supermarket.latitude,
        longitude: supermarket.longitude,
    }));

    // Parse items
    const items = Object.entries(rawData.items || {}).map(([key, item]) => ({
        key: key,
        name: item.name,
        weighted: item.weighted,
        measurementUnit: item.measurementUnit,
        prices: (item.prices || []).map((price) => ({
            id: `${price.brand}_${price.price}`,
            brand: price.brand,
            price: price.price,
        })),
    }));

    return { metadata, supermarkets, items };
};

/**
 * Determines if data should be downloaded based on time and version
 * @returns {Promise<boolean>} Whether data should be downloaded
 */
const shouldDownloadData = async () => {
    // Check for current version
    const currentVersion = FirebaseData.getCurrentUpdateTime();
    if (!currentVersion) {
        return true;
    }

    // Check time-based update requirement
    const lastUpdatedTime = parseInt(currentVersion, 10);
    const currentTime = Date.now();
    if (currentTime - lastUpdatedTime < ONE_WEEK_IN_MILLIS) {
        return false;
    }

    // Check for database version differences
    const lastUpdate = await fetchMetadata();
    return lastUpdate !== currentVersion;
};

/**
 * Utility function for adding delays
 * @param {number} ms - Milliseconds to sleep
 */
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Main data management function
 * Fetches, parses, and stores data in Realm
 */
const manageData = async () => {
    try {
        console.log("Started fetching");
        const rawData = await fetchAllData();
        console.log("Fetched all data!");
        
        const parsedData = parseFunction(rawData);
        console.log("Parsed the data");
        
        FirebaseData.writeData(parsedData);
        console.log("Data successfully downloaded and stored in Realm.");
    } catch (error) {
        console.error("Error managing data:", error);
    }
};

// Exports
export { manageData, shouldDownloadData };
