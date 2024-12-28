// External imports
import { useState, useEffect } from "react";

// Internal imports
import { manageData, shouldDownloadData } from "./src/firebase/DataManager";

// Components
import Spinner from "./src/components/Spinner/Spinner";
import MainContent from "./src/components/MainContent/MainContent";

// Constants
const CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * App Component
 * Root component that manages data fetching and displays main content
 */
const App = () => {
    // State management
    const [fetchingData, setFetchingData] = useState(false);
    
    // Data fetching effect
    useEffect(() => {
        if (!fetchingData) return;

        const fetchData = async () => {
            try {
                await manageData();
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setFetchingData(false);
            }
        };
        fetchData();
    }, [fetchingData]);

    // Periodic update effect
    useEffect(() => {
        const startFetching = async () => {
            if (fetchingData || !await shouldDownloadData()) {
                console.log("Data is up-to-date. No download needed.");
                return;
            }
            setFetchingData(true);
        };

        // Initial fetch on app load
        startFetching();
        
        // Set up periodic checks
        const interval = setInterval(startFetching, CHECK_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    // Render
    return (
        <>
            {fetchingData ? <Spinner /> : <MainContent />}
        </>
    );
};

export default App;