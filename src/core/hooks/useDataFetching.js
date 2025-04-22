// External imports
import { useState, useEffect } from "react";

// Firebase utilities
import { manageData, shouldDownloadData } from "../storage/firebase/DataManager";

// Constants
const CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * useDataFetching Hook
 * Manages periodic data fetching and synchronization with Firebase
 * 
 * Features:
 * - Automatic data fetching on mount
 * - Periodic checks for updates
 * - Prevention of redundant downloads
 * 
 * @returns {Object} Object containing fetchingData state
 */
export const useDataFetching = () => {
    // State management
    const [fetchingData, setFetchingData] = useState(false);

    // Handle data fetching process
    useEffect(() => {
        if (!fetchingData) return;

        const fetchData = async () => {
            try {
                console.log("Fetching data...");
                await manageData();
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setFetchingData(false);
            }
        };
        
        fetchData();
    }, [fetchingData]);

    // Set up periodic update checks
    useEffect(() => {
        const startFetching = async () => {
            if (fetchingData || !await shouldDownloadData()) {
                console.log("Data is up-to-date. No download needed.  ", Date.now());
                return;
            }
            console.log("Data is outdated. Starting download...");
            setFetchingData(true);
        };

        startFetching();
        const interval = setInterval(startFetching, CHECK_INTERVAL);
        
        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    return { fetchingData };
};